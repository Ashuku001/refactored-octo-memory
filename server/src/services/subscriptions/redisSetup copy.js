require("dotenv").config();
// const jwt = require('jsonwebtoken')
// const resolvers = require('../graphql/resolvers.js')
// const typeDefinitions = require("../graphql/schema.js");
// const auth = require("../graphql/auth.js")
// const colors = require('colors')
// const { SubscriptionManager } = require("graphql-subscriptions");
// const { makeExecutableSchema } = require("@graphql-tools/schema");
const { RedisPubSub } = require("graphql-redis-subscriptions");

// module.exports = (utils) = (server) => {
//   const executableSchema = makeExecutableSchema({
//     typeDefs: typeDefinitions,
//     resolvers: resolvers.call(utils),
//     schemaDirectives: {
//       auth: auth,
//     },
//   });


//   const redisConnectionListener = (err) => {
//     if (err) console.error(err); // eslint-disable-line no-console
//     console.info("Succefuly connected to redis"); // eslint-disable-line no-console
//   };
  
//   // Docs on the different redis options
//   // https://github.com/NodeRedis/node_redis#options-object-properties
//   const redisOptions = {
//     host: process.env.REDIS_DOMAIN_NAME,
//     port: process.env.REDIS_PORT_NUMBER,
//     connect_timeout: 15000,
//     enable_offline_queue: true,
//     retry_unfulfilled_commands: true,
//   };
  
//   const pubsub = new RedisPubSub({
//     connection: redisOptions,
//     connectionListener: redisConnectionListener,
//   });

//   const subscriptionManager = new SubscriptionManager({
//     schema: executableSchema,
//     pubsub,
//     setupFunctions: {
//       commentAdded: (options, args) => ({
//         commentAdded: (comment) => comment.repository_name === args.repoFullName,
//       }),
//     },
//   });
// }



const redisConnectionListener = (err) => {
  if (err) console.error(err); // eslint-disable-line no-console
  console.info("Succefuly connected to redis"); // eslint-disable-line no-console
};

// Docs on the different redis options
// https://github.com/NodeRedis/node_redis#options-object-properties
const redisOptions = {
  host: "cntrnoljm4es73c4llv0",
  port: process.env.REDIS_PORT_NUMBER,
  connect_timeout: 15000,
  enable_offline_queue: true,
  retry_unfulfilled_commands: true,
};

const pubsub = new RedisPubSub({
  connection: redisOptions,
  connectionListener: redisConnectionListener,
});



if (exports) {
  exports.pubsub = pubsub;
}
