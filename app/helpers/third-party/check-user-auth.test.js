import checkUserAuth from './check-user-auth.js';
import validateKey from './validate-key.js';

jest.mock('../database/find-one');
jest.mock('./validate-key');

const req = {
  get: function get(key) { return this[key]; },
};

describe('Third party authorization', () => {
  it('should return false when missing api key', async () => {
    const actual = await checkUserAuth(req);
    expect(actual).toBeFalsy();
  });

  it('should return false on failed key validation', async () => {
    const request = {
      ...req,
      apikey: 'apikey',
    };
    validateKey.mockReturnValue(false);
    const actual = await checkUserAuth(request);
    expect(actual).toBeFalsy();
  });

  it('should return true on successful key validation', async () => {
    const request = {
      ...req,
      apikey: 'apikey',
    };
    validateKey.mockReturnValue(true);
    const actual = await checkUserAuth(request);
    expect(actual).toBeTruthy();
  });
});
