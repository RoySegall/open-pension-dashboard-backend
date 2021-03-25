import { createUser } from './db/user';

(async () => {
  const res = await createUser({email: 'b', username: 'a', password: 'a'});
  console.log(res);
})();


