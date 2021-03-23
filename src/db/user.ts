import { BaseEntity, createObject, TransactionResults } from './Utils';
import mongoose from './db';

type User = BaseEntity & {
  readonly username: string,
  readonly password: string,
  readonly email: string,
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date },
});

export const User = mongoose.model('users', userSchema);

export async function createUser(user: User): Promise<TransactionResults> {
  return await createObject(User, user);
}
