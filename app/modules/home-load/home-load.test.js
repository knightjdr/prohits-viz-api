const AddMongoDate = require('../helpers/add-mongo-date');
const Find = require('../db-methods/find');
const HomeLoad = require('./home-load');

const err = new Error('err');

// return data
const returnValues = {
  news: {
    addDate: [{ headline: 1, dbDate: 'a' }, { headline: 2, dbDate: 'b' }],
    find: [{ headline: 1 }, { headline: 2 }],
  },
  spotlight: {
    addDate: [{ authorLastName: 1, dbDate: 'a' }, { authorLastName: 2, dbDate: 'b' }],
    find: [{ authorLastName: 1 }, { authorLastName: 2 }],
  },
};

// mock AddMongoData
jest.mock('../helpers/add-mongo-date');

// mock Find
jest.mock('../db-methods/find');

afterEach(() => {
  AddMongoDate.arr.mockClear();
  Find.mockClear();
});

describe('home page load', () => {
  beforeAll(() => {
    Find
      .mockResolvedValueOnce(returnValues.news.find)
      .mockResolvedValueOnce(returnValues.spotlight.find);
    AddMongoDate.arr
      .mockReturnValueOnce(returnValues.news.addDate)
      .mockReturnValueOnce(returnValues.spotlight.addDate);
  });

  test('database has news and spotlight articles', () => (
    HomeLoad()
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.data).toEqual({
          news: returnValues.news.addDate,
          spotlight: returnValues.spotlight.addDate,
        });
      })
  ));
});

describe('home page load', () => {
  beforeAll(() => {
    Find
      .mockRejectedValueOnce(err)
      .mockRejectedValueOnce(err);
  });

  test('database query gives and error', () => (
    HomeLoad()
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.data).toEqual({
          news: null,
          spotlight: null,
        });
      })
  ));
});
