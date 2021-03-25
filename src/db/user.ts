import * as bcrypt from 'bcrypt';
import {isEmpty} from 'loadsh';

import {
  BaseEntity, createObject, GetEntityArguments, getObject, TransactionResults
} from './Utils';
import mongoose from './db';


export type UserInterface = BaseEntity & {
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
  password: {
    type: String,
    required: true,
    unique: false,
    set: (value) => {
      if (isEmpty(value)) {
        // We handle any empty values.
        return null;
      }

      // For some reason can't access the config file.
      const salt = bcrypt.genSaltSync(parseInt(process.env.saltRounds));
      return bcrypt.hashSync(value, salt);
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email) {
        // todo: find better validation.
        return email.includes('@');
      },
      message: 'The provided email is not a valid email',
    },
  },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
  profilePictureStorageId: { type: Number },
  nameToPresent: { type: String },
});

export const User = mongoose.model('users', userSchema);

/**
 * Creating a user.
 *
 * @param {UserInterface} user - The user object to create in the DB.
 */
export async function createUser(user: UserInterface): Promise<TransactionResults> {
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
