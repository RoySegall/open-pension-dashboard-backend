import { ApolloServer } from 'apollo-server';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { resolvers } from './server/resolvers';
import { typeDefs } from './server/schema';
import { getPort } from './utils/config';

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen({port: getPort()}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

