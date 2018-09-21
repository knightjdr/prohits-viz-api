process.env.NODE_ENV = test;
const database = require('../../connections/database');
const { ObjectID } = require('mongodb');

// mock config
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

const findOne = require('./find-one');

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

describe('Query for a single entry', () => {
  describe('when successful', () => {
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
});
