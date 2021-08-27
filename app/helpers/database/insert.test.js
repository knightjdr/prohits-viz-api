import mongodb from 'mongo-mock';

import database from './database.js';
import findOne from './find.js';
import insert from './insert.js';

// mock config
jest.mock('../../config/config', () => (
  {
    database: {
      prefix: 'test_',
    },
  }
));
jest.mock('./database', () => ({
  connection: null,
}));

beforeAll((done) => {
  mongodb.max_delay = 0;
  const { MongoClient } = mongodb;
  const url = 'mongodb://localhost:27017/test';

  // Insert some documents.
  MongoClient.connect(url, {}, (err, db) => {
    if (err) {
      done();
    } else {
      database.connection = db;
      done();
    }
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
