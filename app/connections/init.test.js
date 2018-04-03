const Init = require('./init');
const { MongoClient } = require('mongodb');

const err = new Error('err');

// mock Config
jest.mock('../../config', () => (
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
MongoClient.connect
  .mockImplementationOnce(() => Promise.resolve(mockClient))
  .mockImplementationOnce(() => Promise.reject(err));

test('database initialization from mongoclient success', () => (
  Init().then((data) => {
    expect(data).toEqual({
      client: mockClient,
      db: 'test',
    });
  })
));

test('database initialization from mongoclient error', () => (
  Init().catch((data) => {
    expect(data).toEqual(new Error('err'));
  })
));
