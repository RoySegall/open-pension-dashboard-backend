import { createFile, Status } from './file';

describe('File testing', () => {

  it('Should failed when passing invalid values', () => {
    expect(1).toBeFalsy();
  });

  it('Should save a file with valid values: nullable storage ID and valid status', async () => {
    const foo = await createFile({filename: 'cat.png', status: Status.processed})
    console.log(foo);
  });

  it('Should fail when setting invalid status', () => {
    expect(1).toBeFalsy();
  });

  it('Updating a file status based on the storage ID', () => {
    expect(1).toBeFalsy();
  });
});
