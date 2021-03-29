import { UserInputError } from 'apollo-server';
import * as bcrypt from 'bcrypt';
import {isEmpty} from 'lodash';

import { createFile, updateFile } from '../../db/file';
import { createTokenObject } from '../../db/token';
import { createToken, createUser, getUser, updateUser } from '../../db/user';

export default {
  // File.
  fileCreate: async (_, args) => {
    const {object: file, errors} = await createFile(args);

    if (errors) {
      throw new UserInputError(errors)
    }
    return file
  },
  fileUpdate: async (_, args) => {
    const id = args.id;
    return await updateFile(id, args);
  },

  // User.
  userCreate: async (_, args) => {
    const {object: user, errors} = await createUser(args);

    if (errors) {
      throw new UserInputError('There was an error while creating the user', errors)
    }

    return user
  },
  userUpdate: async (_, args) => {
    const id = args.id;
    return await updateUser({id, newValues: args});
  },

  // Auth.
  tokenCreate: async (_, args) => {
    const {username, email, password} = args;
    const conditions = {};

    if (username) {
      conditions['username'] = username;
    } else {
      conditions['email'] = email;
    }

    const [user] = await getUser({conditions});

    if (isEmpty(user)) {
      throw new UserInputError('Wrong username or password')
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UserInputError('Wrong username or password')
    }

    const token = await createToken(user);

    // @ts-ignore
    token['expires'] = Math.ceil(token.expires.getTime() / 1000);

    return token;
  },
  refreshToken: async () => {
    return createTokenObject();
  },
  revokeToken: async () => {
    return true;
  }
}
