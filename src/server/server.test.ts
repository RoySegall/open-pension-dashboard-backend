import { createFile, getFile, Status } from '../db/file';

import {
  createTestingServer, filesQuery,
  getQueryForFile, getQueryForFileCreation,
  sendQuery
} from './testingUtils';

describe('Testing server', () => {

  let testingServer;

  const validFile = {
    filename: 'foo.png',
    storageId: 42,
    status: Status.stored
  };

  beforeAll(() => {
    testingServer = createTestingServer()
  });

  const compareFileFromResponse = (fileFromDB, fileFromResponse) => {
    expect(String(fileFromDB._id)).toBe(fileFromResponse.id);
    expect(fileFromDB.filename).toBe(fileFromResponse.filename);
    expect(fileFromDB.storageId).toBe(fileFromResponse.storageId);
    expect(String(fileFromDB.createdAt.getTime())).toBe(fileFromResponse.createdAt);
    expect(String(fileFromDB.updatedAt.getTime())).toBe(fileFromResponse.updatedAt);
  }

  it('Testing the files resolvers', async () => {
    const {data: emptyFilesResponse} = await sendQuery(filesQuery, testingServer);
    expect(emptyFilesResponse.files).toStrictEqual([]);

    // Adding a dummy file and send request.
    const {object: file} = await createFile({filename: 'foo.png', storageId: 42, status: Status.stored});
    const {data: filesResponse} = await sendQuery(filesQuery, testingServer);
    const [fileFromResponse] = filesResponse.files;

    compareFileFromResponse(file, fileFromResponse);
  });

  it('Loading a resolver for a single file', async () => {

    const {data: emptyFilesResponse} = await sendQuery(
      getQueryForFile("1"),
      testingServer
    );
    expect(emptyFilesResponse.file).toBeNull();

    const {object: file} = await createFile(validFile);
    const {data: FilesResponse} = await sendQuery(getQueryForFile(String(file._id)), testingServer);

    compareFileFromResponse(file, FilesResponse.file);
  });

  it('Testing mutation of a file: creating', async () => {
    const {data: emptyFilesResponse} = await sendQuery(
      getQueryForFileCreation(validFile),
      testingServer
    );

    const {filename, id, status, storageId} = emptyFilesResponse.fileCreate;

    expect(filename).toBe('foo.png');
    expect(status).toBe('stored');
    expect(storageId).toBe(42);

    const loadingFileFromDB = await getFile({id: id});

    expect(loadingFileFromDB).not.toBeNull();
    expect(loadingFileFromDB).not.toBeUndefined();
    expect(loadingFileFromDB.filename).toBe(filename);
  });

  it('Testing mutation of a file: updating', () => {
    expect(1).toBeNull();
  });

  it('Testing mutation of file with invalid values', () => {
    expect(1).toBeNull();
  });
});
