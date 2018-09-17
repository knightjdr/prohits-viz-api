process.env.NODE_ENV = test;
const database = require('../../connections/database');
const findOne = require('./find-one');
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
  database.init()
));
afterAll(() => (
  database.close()
));

describe('findOne', () => {
  it('should find one record in the database', () => (
    findOne('get', { name: 'test' }).then((getCollection) => {
      expect(getCollection).toEqual(response.one);
    })
  ));

  it('should subset returned documents from database', () => (
    findOne('get', {}, { _id: 0, field: 1 }).then((getCollection) => {
      expect(getCollection).toEqual(response.subset);
    })
  ));
});
