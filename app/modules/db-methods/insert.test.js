const mongodb = require('mongo-mock');

const database = require('../../connections/database');
const findOne = require('./find');
const insert = require('./insert');

// mock config
jest.mock('../../../config', () => (
  {
    database: {
      prefix: 'test_',
    },
  }
));
jest.mock('../../connections/database', () => ({
  connection: null,
}));

beforeAll(async (done) => {
  mongodb.max_delay = 0;
  const { MongoClient } = mongodb;
  const url = 'mongodb://localhost:27017/test';

  // Insert some documents.
  MongoClient.connect(url, {}, (err, db) => {
    database.connection = db;
    done();
  });
});

describe('Insert document', () => {
  it('should insert a record in the database', async () => {
    const date = new Date().toISOString();
    await insert('insert', { date });
    const document = await findOne('insert', { date }, {});
    expect(document[0].date).toBe(date);
  });
});
