import {
  BaseEntity,
  createObject,
  // GetEntityArguments, getObject,
  TransactionResults
} from './Utils';
import mongoose from './db';

export type FileInterface = BaseEntity & {
  readonly filename: string,
  readonly storageId?: number,
  readonly status: Status
};

export enum Status {
  stored = 'stored',
  processed = 'processed',
  processedWithError = 'processedWithError',
}

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  storageId: {type: Number, unique: true},
  status: {type: String, required: true, enum: Status}
});

export const File = mongoose.model('files', fileSchema);

// /**
//  * Creating a user.
//  *
//  * @param {User} user - The user object to create in the DB.
//  */
// export async function createUser(user: User): Promise<TransactionResults> {
//   return await createObject(User, user);
// }
//
// /**
//  * Loading a user from the DB by id or condition.
//  *
//  * @param {string} id - The id of the user.
//  * @param {Conditions} conditions - the conditions to filter the users by.
//  *
//  * @throws {Error} When none of the arguments was passed.
//  */
// export async function getUser({id, conditions}: GetEntityArguments) {
//   return getObject(User, {id, conditions});
// }

/**
 * Creating a file.
 *
 * @param file - The file object.
 */
export async function createFile(file: FileInterface): Promise<TransactionResults> {
  return await createObject(File, file);
}

// export async function updateFileStatus() {
//   console.log('a');
// }
