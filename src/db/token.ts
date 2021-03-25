import mongoose from './db';

export type UserTokenInterface = {
  readonly token: string,
  readonly refreshToken: string,
  readonly expires: Date,
};

export const TokenSchema = new mongoose.Schema({
  token: {type: String, require: true},
  refreshToken: {type: String, require: true},
  expires: {type: Date, require: true},
});

export function createTokenObject() {
  return {
    token: 'a',
    refreshToken: 'b',
    expires: new Date()
  };
}

export function checkIfTokenExpires() {
  return true;
}
