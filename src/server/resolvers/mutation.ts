import { UserInputError } from 'apollo-server';
import { createFile, updateFile } from '../../db/file';
import { createUser, updateUser } from '../../db/user';

export default {
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
}
