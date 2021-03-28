import { UserInputError } from 'apollo-server';

import { createFile, getFile, updateFile } from '../db/file';
import { createUser, getUser, updateUser } from '../db/user';

export const resolvers = {
  Query: {
    // Files.
    files: () => getFile({conditions: {}}),
    file: (_, args) => getFile({id: args.id}),
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

    // Users.
    users: () => getUser({conditions: {}}),
    user: (_, args) => getUser({id: args.id}),
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

    // Tokens.
  },
};
