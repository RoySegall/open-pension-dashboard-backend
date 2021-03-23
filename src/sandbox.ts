import { createUser } from './db/user';

(async () => {
  const {errors, object} = await createUser({username: 'tom', password:' pizza', email: 'tom@gmail.com'});
  console.log(errors, object);
})();


