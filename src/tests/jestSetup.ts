// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

process.env.dbURL = 'mongodb://127.0.0.1/test';

import { User } from '../db/user';
import { File } from '../db/file';

beforeEach(async () => {
  await User.deleteMany({});
  await File.deleteMany({});
});
