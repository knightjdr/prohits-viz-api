const init = require('./init');
const { MongoClient } = require('mongodb');

const err = new Error('err');

// mock config
jest.mock('../../config/config', () => (
  {
    database: {
      name: 'test',
      pw: 'password',
      user: 'user',
    },
  }
));

// mock MongoClient
const mockClient = {
  db: dbInstance => (
    dbInstance
  ),
};
jest.mock('mongodb');

describe('database initialization', () => {
  it('should give success', async () => {
    MongoClient.connect.mockImplementationOnce(() => Promise.resolve(mockClient));
    const data = await init();
    const expected = {
      client: mockClient,
      db: 'test',
    };
    expect(data).toEqual(expected);
  });

  it('should throw error', async () => {
    MongoClient.connect.mockImplementationOnce(() => Promise.reject(err));
    expect(init()).rejects.toEqual(err);
  });
});
