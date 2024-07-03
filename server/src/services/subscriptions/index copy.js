const jwt = require('jsonwebtoken')
const resolvers = require('../graphql/resolvers.js')
const typeDefinitions = require("../graphql/schema.js");
const auth = require("../graphql/auth.js")
const colors = require('colors')

const { makeExecutableSchema } =require ('@graphql-tools/schema');
const { WebSocketServer } =require ('ws');
const { useServer } =require ('graphql-ws/lib/use/ws');
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET
// first function and second function
module.exports =  (utils) => (server) => {
    const executableSchema = makeExecutableSchema({
        typeDefs:  typeDefinitions,
        resolvers: resolvers.call(utils),
        schemaDirectives: {
            auth: auth
        }
    })

    // the websocket server
    const wsServer  = new WebSocketServer({

        // the httpServer passed from index.js server dir when instantiating the subscriptionserver
        server,
        path: '/subscriptions'
    })

    const subscriptionServer = useServer({
            schema: executableSchema,
            onConnect: async (context) => {
                // check authentication everytine a client connects
                // console.log("CONTEXTs#################", context.extra.request.socket)
                const authorization = context.connectionParams.Authorization
                console.log("server listening for subscriptions websocket🚀🚀🚀".green)

                console.log("AUTHORIZING SUBSCRIPTIONS", authorization)

                if(typeof authorization !== typeof undefined) {
                    var search = "Bearer";
                    var regEx = new RegExp(search, 'ig');

                    const token = authorization.replace(regEx, '').trim();
                    return jwt.verify(token, 
                        JWT_SECRET, 
                        function(err, result){
                            if(err) {
                                throw new Error("Missing auth token!".bgGreen);
                            } else {
                                return utils.db.db.models.Merchant.findByPk(
                                    result.id
                                ).then((merchant) => {
                                    // return the authenticated merchant
                                    context.extra.merchant = merchant
                                    return {merchant}
                                })
                            }
                        })
                } else {
                    // dont return the req object to the context to let the client try to reconnect until it's authenticated
                    throw new Error("Missing auth toksen😫😭".bgRed) 
                }
            },
            context: ({extra: {request, merchant}}) => ({
                merchant,
            }),
            onDisconnect(ctx, code, reason) {
                console.info("Disconnected from the websocket subscriptions".red)
            },
        },
        wsServer)

}