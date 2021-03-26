import { getFiles } from '../db/file';

export const resolvers = {
  Query: {
    files: () => getFiles(),
  },
};
