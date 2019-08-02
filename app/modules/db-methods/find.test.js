const mongodb = require('mongo-mock');
const { ObjectID } = require('mongodb');

const database = require('../../connections/database');
const find = require('./find');

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

const documents = [
  { _id: ObjectID('5aa6ac91c63eb43ab21a072c'), name: 'test', field: 'a' },
  { _id: ObjectID('5aa6ac98c63eb43ab21a072d'), name: 'test2', field: 'b' },
];

beforeAll(async (done) => {
  mongodb.max_delay = 0;
  const { MongoClient } = mongodb;
  const url = 'mongodb://localhost:27017/test';

  // Insert some documents.
  MongoClient.connect(url, {}, (err, db) => {
    database.connection = db;
    db.collection('test_documents').insertMany(documents, () => {
      done();
    });
  });
});

describe('find', () => {
  it('should find all records in the database', async () => {
    const docs = await find('documents');
    const expected = documents;
    expect(docs).toEqual(expected);
  });

  it('should find one record in the database', async () => {
    const docs = await find('documents', { name: 'test' });
    const expected = documents.slice(0, 1);
    expect(docs).toEqual(expected);
  });

  it('should find subset returned documents from database', async () => {
    const docs = await find('documents', {}, { _id: 0, field: 1 });
    const expected = [
      { field: 'a' },
      { field: 'b' },
    ];
    expect(docs).toEqual(expected);
  });

  it('should find sort returned documents from database', async () => {
    const docs = await find('documents', {}, {}, { _id: -1 });
    const expected = [
      { _id: ObjectID('5aa6ac98c63eb43ab21a072d'), name: 'test2', field: 'b' },
      { _id: ObjectID('5aa6ac91c63eb43ab21a072c'), name: 'test', field: 'a' },
    ];
    expect(docs).toEqual(expected);
  });

  it('should find limit returned documents from database', async () => {
    const docs = await find('documents', {}, {}, {}, 1);
    const expected = [
      { _id: ObjectID('5aa6ac91c63eb43ab21a072c'), name: 'test', field: 'a' },
    ];
    expect(docs).toEqual(expected);
  });
});
