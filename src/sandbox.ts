import { getUser } from './db/user';

(async () => {
  // const id = "6059acd9d7213cc8a81c5108";
  // const conditions = {username: "noy"};
  // const res = await getUser({conditions: {food: 'pizza', toppings: 'a'}});
  const res = await getUser({});
  console.log(res);
})();


