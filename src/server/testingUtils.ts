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

export const fileQuery = (fileId: string) => gql`
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

export const fileCreationQuery = ({filename, storageId, status}) => gql`
  mutation {
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

export const fileUpdateQuery = ({id, filename, storageId, status}) => gql`
  mutation {
    fileUpdate(id: "${id}", filename: "${filename}", storageId: ${storageId}, status: "${status}") {
      filename,
      id,
      status,
      storageId,
      createdAt,
      updatedAt,
    }
  }
`;

export const usersQuery = gql`
  query {
    users {
      id
      username
      email
      nameToPresent
      profilePictureStorageId
    }
  }
`

export const userQuery = (id) => gql`
  query {
    user(id: "${id}") {
      id
      username
      email
      nameToPresent
      profilePictureStorageId
    }
  }
`;

export const userCreationQuery = ({username, password, email, nameToPresent = '', profilePictureStorageId = null}) => gql`
  mutation {
    userCreate(username: "${username}", password: "${password}", email: "${email}", nameToPresent: "${nameToPresent}", profilePictureStorageId: ${profilePictureStorageId}) {
      id
      username
      email
      nameToPresent
      profilePictureStorageId
    }
  }
`;

export const userUpdateQuery = ({id, username, email, password, nameToPresent, profilePictureStorageId}) => gql`
  mutation {
    userUpdate(id: "${id}", username: "${username}", password: "${password}", email: "${email}", nameToPresent: "${nameToPresent}", profilePictureStorageId: ${profilePictureStorageId}) {
      id
      username
      email
      nameToPresent
      profilePictureStorageId
    }
  }
`;

