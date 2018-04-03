const AddMongoDate = require('../helpers/add-mongo-date');
const Find = require('../db-methods/find');
const FindOne = require('../db-methods/find-one');
const News = require('./news');

const err = new Error('err');
const mongoID = '5aa6ac91c63eb43ab21a072c';

// return data
const returnValues = {
  news: {
    addDate: [{ headline: 1, dbDate: 'a' }, { headline: 2, dbDate: 'b' }],
    find: [{ headline: 1 }, { headline: 2 }],
  },
};

// mock AddMongoData
jest.mock('../helpers/add-mongo-date');

// mock Find
jest.mock('../db-methods/find');
jest.mock('../db-methods/find-one');

describe('News list', () => {
  beforeAll(() => {
    Find
      .mockResolvedValueOnce(returnValues.news.find);
    AddMongoDate.arr
      .mockReturnValueOnce(returnValues.news.addDate);
  });

  afterAll(() => {
    AddMongoDate.arr.mockClear();
    Find.mockClear();
  });

  test('Find returns response object', () => (
    News()
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.data).toEqual({
          news: returnValues.news.addDate,
        });
      })
  ));
});

describe('News list error', () => {
  beforeAll(() => {
    Find
      .mockRejectedValueOnce(err);
  });

  afterAll(() => {
    Find.mockClear();
  });

  test('Return response object on error', () => (
    News()
      .then((result) => {
        expect(result.status).toBe(500);
      })
  ));
});

describe('News item', () => {
  beforeAll(() => {
    FindOne
      .mockResolvedValueOnce(returnValues.news.find[0])
      .mockResolvedValueOnce(null);
    AddMongoDate.obj
      .mockReturnValueOnce(returnValues.news.addDate[0])
      .mockReturnValueOnce(null);
  });

  afterAll(() => {
    AddMongoDate.obj.mockClear();
    FindOne.mockClear();
  });

  test('Find returns response object with ID found', () => (
    News(mongoID)
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.data).toEqual({
          news: returnValues.news.addDate[0],
        });
      })
  ));

  test('Find returns status code with ID notfound', () => (
    News(mongoID)
      .then((result) => {
        expect(result.status).toBe(204);
      })
  ));
});

describe('News item error', () => {
  beforeAll(() => {
    FindOne
      .mockRejectedValueOnce(err);
  });

  afterAll(() => {
    FindOne.mockClear();
  });

  test('Return response object on error', () => (
    News(mongoID)
      .then((result) => {
        expect(result.status).toBe(500);
      })
  ));

  test('Return response object when given invalid ID', () => (
    News('aaaa')
      .then((result) => {
        expect(result.status).toBe(204);
      })
  ));
});
