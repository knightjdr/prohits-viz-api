const auth = require('./auth');
const findOne = require('../../db-methods/find-one');
const validateKey = require('./validate-key');

jest.mock('../../db-methods/find-one');
jest.mock('./validate-key');

const req = {
  get: function get(key) { return this[key]; },
};

describe('Third party authorization', () => {
  it('should reject with missing api key', async () => {
    await expect(auth(req)).rejects.toEqual(new Error('missing api key'));
  });

  it('should reject on failed database lookup', async () => {
    const request = {
      ...req,
      apikey: 'apikey',
    };
    findOne.mockRejectedValue();
    await expect(auth(request)).rejects.toBeUndefined();
  });

  describe('successful database lookup', () => {
    let request;

    beforeAll(() => {
      request = {
        ...req,
        apikey: 'apikey',
      };
      findOne.mockResolvedValue();
    });

    it('should reject when failing to validate matched apikey', async () => {
      const err = new Error('validation failed');
      validateKey.mockReturnValue(err);
      await expect(auth(request)).rejects.toEqual(err);
    });

    it('should resolve if apikey validates', async () => {
      validateKey.mockReturnValue(true);
      await expect(auth(request)).resolves.toBeUndefined();
    });
  });
});
