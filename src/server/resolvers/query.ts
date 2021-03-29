import { getFile } from '../../db/file';
import { getUser } from '../../db/user';

export default {
  files: () => getFile({conditions: {}}),
  file: (_, args) => getFile({id: args.id}),

  users: () => getUser({conditions: {}}),
  user: (_, args) => getUser({id: args.id}),

  // @ts-ignore
  me: async (_, args, context) => {
    const {user} = context;
    // Get the
    return user;
  }
};
