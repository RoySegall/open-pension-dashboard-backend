import { gql } from 'apollo-server';

export const typeDefs = gql`
  type File {
    id: String
    filename: String
    storageId: Int
    status: String,
    createdAt: String,
    updatedAt: String,
  }

  type Query {
    files: [File]
  }
`;
