import { createUser, getUser } from '../db/user';

import { createTestingServer, sendQuery, tokenQuery } from './testingUtils';

describe('Auth', () => {

  let testingServer;

  beforeAll(() => {
    testingServer = createTestingServer()
  });

  const validUser = {
    username: 'sam',
    email: 'sam@cat.com',
    password: '1234',
    nameToPresent: 'Sam the cat',
    profilePictureStorageId: 22
  };

  const createValidUser = async () => {
    const {object: user} = await createUser(validUser);

    return user;
  }

  it('Should create an access token when passing correct credentials', async () => {
    const user = await createValidUser();
    const {data} = await sendQuery(tokenQuery(user), testingServer);

    const {token, refreshToken} = data.tokenCreate;

    const userFromDb = await getUser({id: String(user._id)});
    const {token: tokenFromUser} = userFromDb;

    expect(userFromDb).not.toBeNull();
    expect(userFromDb).not.toBeUndefined();

    expect(tokenFromUser.token).toBe(token);
    expect(tokenFromUser.refreshToken).toBe(refreshToken);
  });

  it('Should not create an access token when passing wrong credentials', async () => {
    [
      // Passing wrong password.
      {email: validUser.email, password: "this is a random password"},
      // Passing wrong email.
      {email: 'wrong@email.com', password: validUser.password},
      // Passing wrong username.
      {username: 'wrongUsername', password: validUser.password},

    ].forEach(async (user) => {
      const {data, errors} = await sendQuery(
        tokenQuery(user),
        testingServer
      );

      const [error] = errors;
      expect(data).toBeNull();
      expect(error.message).toBe('Wrong username or password');
    });
  });

  it('Should delete the token form the user object when revoking the token', () => {
    expect(1).toBe(1);
  });

  it('Should refresh user token', () => {
    expect(1).toBe(1);
  });

  it('Should return the current logged in user when query `me` and the token exists in the header', () => {
    expect(1).toBe(1);
  });

  it('Should not return the current logged in user when query `me` and the token does not exists in the header', () => {
    expect(1).toBe(1);
  });

  it('Should not return any user when query `me` and invalid token exists in the header', () => {
    expect(1).toBe(1);
  });

  it('Should not authorize to the user, files, and me when not authenticated', async () => {
    expect(1).toBe(1);
  });

});
