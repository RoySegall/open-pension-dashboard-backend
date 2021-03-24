process.env.dbURL = 'mongodb://127.0.0.1/test';

import { User } from '../db/user';

beforeEach(async () => {
  await User.deleteMany({});
});
