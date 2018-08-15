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

describe('Home page load', () => {
  describe('when database has news and spotlight articles', () => {
    let response;

    beforeAll(async (done) => {
      Find
        .mockResolvedValueOnce(returnValues.news.find)
        .mockResolvedValueOnce(returnValues.spotlight.find);
      AddMongoDate.arr
        .mockReturnValueOnce(returnValues.news.addDate)
        .mockReturnValueOnce(returnValues.spotlight.addDate);
      HomeLoad()
        .then((result) => {
          response = result;
          done();
        });
    });

    it('should return 200 status', () => {
      expect(response.status).toBe(200);
    });

    it('should return data object', () => {
      expect(response.data).toEqual({
        news: returnValues.news.addDate,
        spotlight: returnValues.spotlight.addDate,
      });
    });
  });

  describe('when database query gives and error', () => {
    let response;

    beforeAll(async (done) => {
      Find
        .mockRejectedValueOnce(err)
        .mockRejectedValueOnce(err);
      HomeLoad()
        .then((result) => {
          response = result;
          done();
        });
    });

    it('should return 200 status', () => {
      expect(response.status).toBe(200);
    });

    it('should return null data object', () => {
      expect(response.data).toEqual({
        news: null,
        spotlight: null,
      });
    });
  });
});
