import {
  BaseEntity, createObject, GetEntityArguments, getObject, TransactionResults
} from './Utils';
import mongoose from './db';

export type User = BaseEntity & {
  readonly username: string,
  readonly password: string,
  readonly email: string,
  readonly createdAt?: Date,
  readonly updatedAt?: Date,
  readonly profilePictureStorageId?: number,
  readonly nameToPresent?: string,
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  profilePictureStorageId: { type: Number },
  nameToPresent: { type: String },
});

export const User = mongoose.model('users', userSchema);

/**
 * Creating a user.
 *
 * @param {User} user - The user object to create in the DB.
 */
export async function createUser(user: User): Promise<TransactionResults> {
  return await createObject(User, user);
}

/**
 * Loading a user from the DB by id or condition.
 *
 * @param {string} id - The id of the user.
 * @param {Conditions} conditions - the conditions to filter the users by.
 *
 * @throws {Error} When none of the arguments was passed.
 */
export async function getUser({id, conditions}: GetEntityArguments) {
  return getObject(User, {id, conditions});
}
