import { createFile, getFile } from '../db/file';

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
  },
};
