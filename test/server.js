const { ApolloServer } = require('apollo-server');
const typeDefs = require('../src/schema/schema');
const resolvers = require('../src/resolvers/resolvers');
global.logger = require('../src/utils/winstonLogger');

const { gql } = require('apollo-server');

// inspired from
// https://www.apollographql.com/docs/apollo-server/getting-started/

const createServerSimple = () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  return server;
};

module.exports = createServerSimple;