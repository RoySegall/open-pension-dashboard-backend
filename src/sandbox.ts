import { createUser } from './db/userInterface';

(async () => {
  const res = await createUser({email: 'b', username: 'a', password: 'a'});
  console.log(res);
})();


