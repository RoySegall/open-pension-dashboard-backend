import { getFile } from '../../db/file';
import { getUser } from '../../db/user';

export default {
  files: () => getFile({conditions: {}}),
  file: (_, args) => getFile({id: args.id}),

  users: () => getUser({conditions: {}}),
  user: (_, args) => getUser({id: args.id}),

  me: () => {
    // Get the
    return {"nameToPresent": "john"}
  }
};
