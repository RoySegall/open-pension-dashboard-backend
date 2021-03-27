import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';

import { createFile, Status } from '../db/file';

import {resolvers} from './resolvers';
import {typeDefs} from './schema';

describe('Testing server', () => {

  let testingServer;

  const sendQuery = async (graphqlQuery) => {
    const {query} = testingServer;
    return await query({ query: graphqlQuery });
  };

  beforeAll(() => {

    const server = new ApolloServer({
      typeDefs,
      resolvers
    });

    testingServer = createTestClient(server);
  });

  it('Testing the files resolvers', async () => {
    const query = gql`
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

    const {data: emptyFilesResponse} = await sendQuery(query);
    expect(emptyFilesResponse.files).toStrictEqual([]);

    // Adding a dummy file and send request.
    const {object: file} = await createFile({filename: 'foo.png', storageId: 42, status: Status.stored});
    const {data: filesResponse} = await sendQuery(query);
    const [fileFromResponse] = filesResponse.files;

    expect(String(file._id)).toBe(fileFromResponse.id);
    expect(file.filename).toBe(fileFromResponse.filename);
    expect(file.storageId).toBe(fileFromResponse.storageId);
    expect(String(file.createdAt.getTime())).toBe(fileFromResponse.createdAt);
    expect(String(file.updatedAt.getTime())).toBe(fileFromResponse.updatedAt);
  });

  it('Loading a resolver for a single file', () => {
    expect(1).toBeNull();
  });

  it('Testing mutation of a file', () => {
    expect(1).toBeNull();
  });

  it('Testing mutation of file with invalid values', () => {
    expect(1).toBeNull();
  });
});
