import { ApolloServer } from 'apollo-server';
import {isEmpty} from 'lodash';

import { loadUserByToken } from '../db/user';

import { resolvers } from './resolvers';
import { typeDefs } from './schema';


export const getUserFromRequest = async (req) => {
  if (isEmpty(req) || isEmpty(req.headers)) {
    return {};
  }
  const {token} = req.headers.authorization;
  const user = await loadUserByToken(token);

  if (isEmpty(user)) {
    return {};
  }

  return {user};
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    return getUserFromRequest(req);
  },
});
