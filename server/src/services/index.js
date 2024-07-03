
const graphql = require('./graphql/index.js' )// the apollo server
const subscriptions = require("./subscriptions/index.js")
// export the services graphql server and database

// running the apollo server and the subscriptions server concurenty
module.exports = utils => ({
    subscriptions: subscriptions(utils),
    graphql: graphql.server(utils),
})