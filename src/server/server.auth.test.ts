import { createToken, createUser, getUser } from '../db/user';
import { getUserFromRequest } from './server';

import {
  createTestingServer,
  refreshTokenQuery, revokeTokenQuery,
  sendQuery,
  tokenQuery
} from './testingUtils';

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
    const {data} = await sendQuery(tokenQuery(validUser), testingServer);

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
      expect(data.tokenCreate).toBeNull();
      expect(error.message).toBe('Wrong username or password');
    });
  });

  it('Should refresh user token', async () => {
    const user = await createValidUser();
    const token = await createToken(user);

    const {data: refreshTokenResults} = await sendQuery(refreshTokenQuery(token), testingServer);
    const {token: newToken, refreshToken: newRefreshToken} = refreshTokenResults.refreshToken;

    // Reload the user.
    const reloadedUser = await getUser({id: String(user._id)});

    expect(reloadedUser.token).not.toBeNull();
    expect(reloadedUser.token).not.toBeUndefined();

    expect(token.token).not.toBe(reloadedUser.token.token);
    expect(token.refreshToken).not.toBe(reloadedUser.token.refreshToken);

    expect(newToken).toBe(reloadedUser.token.token);
    expect(newRefreshToken).toBe(reloadedUser.token.refreshToken);
  });

  it('Should fail gracefully when passing wrong access token and refresh token', async () => {
    const {data: refreshTokenResults, errors} = await sendQuery(refreshTokenQuery({token: "foo", refreshToken: "bar"}), testingServer);
    const [{message}] = errors;

    expect(message).toBe('An error occurred while trying to refresh the token');
    expect(refreshTokenResults.refreshToken).toBeNull();
  });

  it('Should delete the token from the user object when revoking the token', async () => {
    const user = await createValidUser();
    await createToken(user);
    const id = String(user._id);

    const {data: revokeTokenResults} = await sendQuery(revokeTokenQuery({id}), testingServer);
    expect(revokeTokenResults.revokeToken).toBeTruthy();

    const reloadedUser = await getUser({id});

    expect(reloadedUser.token.token).toBeUndefined();
    expect(reloadedUser.token.refreshToken).toBeUndefined();
    expect(reloadedUser.token.expires).toBeUndefined();
  });

  it('getUserFromRequest: Should return the correct user when passing the token in the headers', async () => {
    const user = await createValidUser();
    const token = await createToken(user);

    const {user: userFromAuthHandler} = await getUserFromRequest({headers: {authorization: token}});
    expect(String(userFromAuthHandler._id)).toBe(String(user._id));
  });

  it('getUserFromRequest: Should not return any user object when passing invalid/not existing token', async () => {
    expect(1).toBe(1);
  });

  it('getUserFromRequest should be invoked when query the server', async () => {
    expect(1).toBe(1);
  });

  it('Should block requests when the token does not exists in the headers', async () => {
    expect(1).toBe(1);
  });

});
