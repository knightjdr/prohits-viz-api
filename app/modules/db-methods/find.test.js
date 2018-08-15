process.env.NODE_ENV = test;
const Database = require('../../connections/database');
const Find = require('./find');
const { ObjectID } = require('mongodb');

// mock Config
jest.mock('../../../config', () => (
  {
    database: {
      name: 'sandbox',
      prefix: 'test_',
      pw: 'sandboxpw',
      user: 'sandbox',
    },
  }
));
// mock logger
jest.mock('../../../logger');

// expected return values
const response = {
  all: [
    { _id: ObjectID('5aa6ac91c63eb43ab21a072c'), name: 'test', field: 'a' },
    { _id: ObjectID('5aa6ac98c63eb43ab21a072d'), name: 'test2', field: 'b' },
  ],
  limit: [
    { _id: ObjectID('5aa6ac91c63eb43ab21a072c'), name: 'test', field: 'a' },
  ],
  one: [
    { _id: ObjectID('5aa6ac91c63eb43ab21a072c'), name: 'test', field: 'a' },
  ],
  sorted: [
    { _id: ObjectID('5aa6ac98c63eb43ab21a072d'), name: 'test2', field: 'b' },
    { _id: ObjectID('5aa6ac91c63eb43ab21a072c'), name: 'test', field: 'a' },
  ],
  subset: [
    { field: 'a' },
    { field: 'b' },
  ],
};

beforeAll(() => (
  Database.init()
));
afterAll(() => (
  Database.close()
));

describe('Find', () => {
  it('should find all records in the database', () => (
    Find('get').then((getCollection) => {
      expect(getCollection).toEqual(response.all);
    })
  ));

  it('should find one record in the database', () => (
    Find('get', { name: 'test' }).then((getCollection) => {
      expect(getCollection).toEqual(response.one);
    })
  ));

  it('should find subset returned documents from database', () => (
    Find('get', {}, { _id: 0, field: 1 }).then((getCollection) => {
      expect(getCollection).toEqual(response.subset);
    })
  ));

  it('should find sort returned documents from database', () => (
    Find('get', {}, {}, { _id: -1 }).then((getCollection) => {
      expect(getCollection).toEqual(response.sorted);
    })
  ));

  it('should find limit returned documents from database', () => (
    Find('get', {}, {}, {}, 1).then((getCollection) => {
      expect(getCollection).toEqual(response.limit);
    })
  ));
});
