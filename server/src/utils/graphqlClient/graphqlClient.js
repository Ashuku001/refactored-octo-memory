require('dotenv').config()
const { GraphQLClient } = require("graphql-request");
const graphQLClient = new GraphQLClient(`${process.env.GRAPHQLURI}/graphql`, {
  headers: {
    "content-type": "application/json",
  },

});
module.exports = graphQLClient