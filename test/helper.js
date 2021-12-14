const { createTestClient } = require('apollo-server-testing');
const { gql } = require("apollo-server");
const createServer = require('./server');

async function runQuery(headers,gqlRequest){
  const server = createServer();
  const { query } =  createTestClient(server);
  const gqlRequests = await query({
    query :gql`${gqlRequest}`
  });
  return gqlRequests
}

async function mutationQuery(headers,gqlRequest){
  const server = createServer();
  const { mutate } =  createTestClient(server);
  const gqlRequests = await mutate({
    query :gql`${gqlRequest}`
  });
  return gqlRequests
}
module.exports ={
  runQuery,
  mutationQuery
}
