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
          createdAt
        }
      }
    `;

    const {data: emptyFilesResponse} = await sendQuery(query);
    expect(emptyFilesResponse.files).toStrictEqual([]);

    // Adding a dummy file and send request.
    const {object: file} = await createFile({filename: 'foo.png', storageId: 42, status: Status.stored});

    const {data: FilesResponse} = await sendQuery(query);

    expect(FilesResponse).toStrictEqual({files: [file.toJSON()]});
  });
});
