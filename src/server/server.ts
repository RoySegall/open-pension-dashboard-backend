import { ApolloServer } from 'apollo-server';

import { resolvers } from './resolvers';
import { typeDefs } from './schema';

import {isEmpty} from 'lodash';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {

    if (isEmpty(req)) {
      return {};
    }

    console.log(req);

    if (isEmpty(req.headers)) {
      return {};
    }

    console.log('fooo', req.headers.authrization);

    return {'user': {name: 'john'}};
  },
});
