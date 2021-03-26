import * as bcrypt from 'bcrypt';

import {
  createToken,
  createUser,
  getUser,
  loadUserByToken, User
} from './user';

describe('Testing user', () => {

  const baseUser = {
    username: '',
    password: '',
    email: '',
  };

  const validUser = {
    username: 'username',
    password: 'password',
    email: 'test@example.com',
  };

  const createUserAndVerifyExpects = async (matrix) => {
      const {baseUser, expected} = matrix;
      const {errors, object} = await createUser(baseUser);
      expect(expected.object).toBe(object);
      expect(expected.errors).toStrictEqual(errors);
  };

  it('Should failed when creating a user without details', async () => {

    await createUserAndVerifyExpects({
      baseUser: baseUser,
      expected: {
        object: null,
        errors: {
          username: 'Path `username` is required.',
          password: 'Path `password` is required.',
          email: 'Path `email` is required.'
        }
      }
    });

    // Adding a username to object.
    baseUser.username = 'username';
    await createUserAndVerifyExpects({
      baseUser: baseUser,
      expected: {
        object: null,
        errors: {
          password: 'Path `password` is required.',
          email: 'Path `email` is required.'
        }
      }
    });

    // Adding a password to the object.
    baseUser.password = 'password';
    await createUserAndVerifyExpects({
      baseUser: baseUser,
      expected: {
        object: null,
        errors: {
          email: 'Path `email` is required.'
        }
      }
    });

    // Adding a password to the object.
    baseUser.email = 'test@example.com';
    const {errors, object} = await createUser(baseUser);
    expect(object).not.toBeNull();
    expect(errors).toBeNull();
  });

  it('Should failed when passing wrong email', async () => {
    baseUser.username = 'username';
    baseUser.password = 'password';
    baseUser.email = 'email';

    const {errors, object} = await createUser(baseUser);
    expect(object).toBeNull();
    expect(errors).toStrictEqual({
      email: 'The provided email is not a valid email'
    });
  });

  it('Should encrypt the password', async () => {
    const {object} = await createUser(validUser);
    expect(object.password).not.toBeNull();
    expect(object.password).not.toBe('password');

    const passwordMatch = await bcrypt.compare('password', object.password);
    expect(passwordMatch).toBeTruthy();
  });

  it('Should auto fill the created at when creating a user', async () => {
    const {object} = await createUser(validUser);
    expect(object.createdAt).not.toBeUndefined();
    expect(object.createdAt).not.toBeNull();
  });

  it('Should create a valid token for user', async() => {
    const {object: user} = await createUser(validUser);
    let userFromDB = await getUser({id: user._id});
    expect(userFromDB.token).toBeUndefined();
    await createToken(user);

    userFromDB = await getUser({id: user._id});
    const {token, refreshToken, expires} = userFromDB.token;

    expect(token).not.toBeNull();
    expect(refreshToken).not.toBeNull();
    expect(expires).not.toBeNull();
  });

  it('Loading user when passing token', async () => {
    const {object: user} = await createUser(validUser);
    const {token} = await createToken(user);

    const loadedUserByToken = await loadUserByToken(token);

    expect(String(user._id)).toBe(String(loadedUserByToken._id));
  });

  it('Should not load user when token is expires', async () => {
    const {object: user} = await createUser(validUser);
    const token = await createToken(user);

    const reloadedUser = await getUser({id: user._id});

    // Change the expires of the token to now.
    reloadedUser.token.expires.setSeconds(reloadedUser.token.expires.getSeconds() + 86400);
    await User.findOneAndUpdate(
      {_id: user._id}, { token: reloadedUser.token }
    )

    const loadedUserByToken = await loadUserByToken(token.token);

    expect(loadedUserByToken).toBeNull();
  });

  it('Should create a new token for user when passing the refresh token', async () => {
    expect(1).toBeNull()
  });

  it('Should not load the user after refreshing the token', async () => {
    expect(1).toBeNull();
  });

  it('Should not validate user when the token was removed for the user', async () => {
    expect(1).toBeNull();
  });
});
