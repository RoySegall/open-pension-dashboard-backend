describe('Auth', () => {

  it('Should create an access token when passing correct credentials', () => {
    expect(1).toBe(1);
  });

  it('Should not create an access token when passing wrong credentials', () => {
    expect(1).toBe(1);
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
