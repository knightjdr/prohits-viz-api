/* eslint max-len: 0 */

const validate = require('./validate-key');

describe('Validate password', () => {
  it('should validate when password matches hash', async () => {
    const match = {
      algo: 'sha512',
      hash: 'fdbbcdd9cbefe2b2f3ec381ab67fc8f7176dc9150099024709a3df35d401f72cb400db80b34b5e53adaee61abb5c0d8308d0b3d906741ccb8bcc84f4e5a8dfdd',
      iterations: 10000,
      keylen: 64,
      salt: 'qXtlyFINWNiWZkzXrYY+wVKdXtQKMtiyvDuV/6/kQFhP3MrUuQ/5Mzq3/c3EQBbd22E5JAi/lamAzcse9EP3tLSvjm9aBn2kMdQ/lngrMusebFGx8kopCIK1rM0HbBmwPft2YkOwINmhLdYyV8mrYxItIoVgSK3XLk5l2dj0Vco=',
    };
    const password = 'Hb2b0uFVJXKQVou7SfBBdEfepssxpwIj';
    expect(validate(match, password)).toBeTruthy();
  });

  it('should not validate when match is undefined', async () => {
    const match = undefined;
    const password = 'Hb2b0uFVJXKQVou7SfBBdEfepssxpwIj';
    expect(validate(match, password)).toBeFalsy();
  });

  it('should not validate when match is not an object', async () => {
    const match = [];
    const password = 'Hb2b0uFVJXKQVou7SfBBdEfepssxpwIj';
    expect(validate(match, password)).toBeFalsy();
  });

  it('should not validate when a password does not match hash', async () => {
    // Deleted first character from hash
    const match = {
      algo: 'sha512',
      hash: 'dbbcdd9cbefe2b2f3ec381ab67fc8f7176dc9150099024709a3df35d401f72cb400db80b34b5e53adaee61abb5c0d8308d0b3d906741ccb8bcc84f4e5a8dfdd',
      iterations: 10000,
      keylen: 64,
      salt: 'qXtlyFINWNiWZkzXrYY+wVKdXtQKMtiyvDuV/6/kQFhP3MrUuQ/5Mzq3/c3EQBbd22E5JAi/lamAzcse9EP3tLSvjm9aBn2kMdQ/lngrMusebFGx8kopCIK1rM0HbBmwPft2YkOwINmhLdYyV8mrYxItIoVgSK3XLk5l2dj0Vco=',
    };
    const password = 'Hb2b0uFVJXKQVou7SfBBdEfepssxpwIj';
    expect(validate(match, password)).toBeFalsy();
  });
});
