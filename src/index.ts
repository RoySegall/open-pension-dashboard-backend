import { ApolloServer } from 'apollo-server';

import { resolvers } from './server/resolvers';
import { typeDefs } from './server/schema';

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

