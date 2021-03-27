import { createFile, getFile, updateFile } from '../db/file';

export const resolvers = {
  Query: {
    files: () => getFile({conditions: {}}),

    file: (_, args) => {
      return getFile({id: args.id})
    },

    fileCreate: async (_, args) => {
      const {object: file} = await createFile(args);
      return file
    },

    fileUpdate: async (_, args) => {
      const id = args.id;
      delete args.id;
      return await updateFile(id, args);
    },
  },
};
