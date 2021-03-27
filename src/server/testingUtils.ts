import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';

import { resolvers } from './resolvers';
import { typeDefs } from './schema';

export const createTestingServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  return createTestClient(server);
}

export const sendQuery = async (graphqlQuery, testingServer) => {
  const {query} = testingServer;
  return await query({ query: graphqlQuery });
};

export const filesQuery = gql`
  query {
    files {
      filename,
      id,
      status,
      storageId,
      createdAt,
      updatedAt,
    }
  }
`;

export const getQueryForFile = (fileId: string) => gql`
  query {
    file(id: "${fileId}") {
      filename,
      id,
      status,
      storageId,
      createdAt,
      updatedAt,
    }
  }
`;

export const getQueryForFileCreation = ({filename, storageId, status}) => gql`
  query {
    fileCreate(filename: "${filename}", storageId: ${storageId}, status: "${status}") {
      filename,
      id,
      status,
      storageId,
      createdAt,
      updatedAt,
    }
  }
`;
