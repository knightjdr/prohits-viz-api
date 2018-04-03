process.env.NODE_ENV = test;
const Database = require('../../connections/database');
const FindOne = require('./find-one');
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
  one: { _id: ObjectID('5aa6ac91c63eb43ab21a072c'), name: 'test', field: 'a' },
  subset: { field: 'a' },
};

beforeAll(() => (
  Database.init()
));
afterAll(() => (
  Database.close()
));

describe('FindOne', () => {
  test('find one record in the database', () => (
    FindOne('get', { name: 'test' }).then((getCollection) => {
      expect(getCollection).toEqual(response.one);
    })
  ));

  test('subset returned documents from database', () => (
    FindOne('get', {}, { _id: 0, field: 1 }).then((getCollection) => {
      expect(getCollection).toEqual(response.subset);
    })
  ));
});
