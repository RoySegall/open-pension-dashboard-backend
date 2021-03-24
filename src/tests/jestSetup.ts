process.env.dbURL = 'mongodb://127.0.0.1/test';

import { dropDatabase } from '../db/db';

beforeEach(async () => {
  await dropDatabase();
});
