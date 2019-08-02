const mongodb = require('mongo-mock');

const database = require('../../connections/database');
const findOne = require('./find-one');

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
    const docs = [
      { _id: 1, name: 'test' },
      { _id: 2, name: 'test2' },
    ];
    db.collection('test_documents').insertMany(docs, () => {
      done();
    });
  });
});

describe('Query for a single entry', () => {
  describe('when successful', () => {
    it('should find one record in the database', async () => {
      const expected = { _id: 1, name: 'test' };
      const document = await findOne('documents', { name: 'test' });
      expect(document).toEqual(expected);
    });

    it('should subset returned documents from database', async () => {
      const expected = { name: 'test' };
      const document = await findOne('documents', { name: 'test' }, { _id: 0, name: 1 });
      expect(document).toEqual(expected);
    });

    it('should not find a record in the database', async () => {
      const expected = null;
      const document = await findOne('documents', { name: 'test-missing' });
      expect(document).toEqual(expected);
    });
  });
});

describe('Query throwing an error', () => {
  beforeAll(() => {
    // Make database undefined to cause an error to throw.
    database.connection = undefined;
  });

  it('should throw an error', () => (
    expect(findOne('documents', { name: 'test' })).rejects.not.toBeNull()
  ));
});
