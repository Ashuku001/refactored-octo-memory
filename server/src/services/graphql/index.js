const { ApolloServer } = require("@apollo/server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
require("dotenv").config;

const resolvers = require("./resolvers.js");
const typeDefinitions = require("./schema.js");
const { authDirective } = require("./auth.js");

const app = express();
const httpServer = http.createServer(app);

const server = (utils) => {
  // extract the schema transfromer by passing auth directive name
  const { authDirectiveTypeDefs, authDirectiveTransformer } =
    authDirective("auth");

  let executableSchema = makeExecutableSchema({
    typeDefs: [authDirectiveTypeDefs, typeDefinitions], // pass the authentication logic to the schema every request to our apollo server should be authenticated
    resolvers: resolvers.call(utils),
  });

  executableSchema = authDirectiveTransformer(executableSchema);

  const server = new ApolloServer({ 
    schema: executableSchema,
    plugins: [
      // proper shutdown for the HTTP server
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // proper shutdown for the websocket server
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await subscriptionServer.dispose()
            }
          }
        }
      }
    ],
  });

  return server;
};

module.exports = { server };
