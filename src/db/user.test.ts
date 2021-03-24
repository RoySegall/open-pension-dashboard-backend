import { createUser } from './user';

describe('Testing user', () => {

  const baseUser = {
    username: '',
    password: '',
    email: '',
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

  it('Should encrypt the password', () => {
    console.log('a');
  });

  it('Should auto fill the created at when creating a user', () => {
    console.log('a');
  });

  it('Should changed the updated at when updating the user', () => {
    console.log('a');
  });
});
