const addMongoData = require('../helpers/add-mongo-date');
const find = require('../db-methods/find');
const homeLoad = require('./home-load');

jest.mock('../helpers/add-mongo-date');
jest.mock('../db-methods/find');

const req = {};
const res = {
  send: jest.fn(),
  status: jest.fn(),
};
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

describe('Home page load', () => {
  describe('when database has news and spotlight articles', () => {
    afterAll(() => {
      res.send.mockClear();
      res.status.mockClear();
    });

    beforeAll(async (done) => {
      find
        .mockResolvedValueOnce(returnValues.news.find)
        .mockResolvedValueOnce(returnValues.spotlight.find);
      addMongoData.arr
        .mockReturnValueOnce(returnValues.news.addDate)
        .mockReturnValueOnce(returnValues.spotlight.addDate);
      homeLoad(req, res)
        .then(() => {
          done();
        });
    });

    it('should use default status', () => {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should send response data', () => {
      expect(res.send).toHaveBeenCalledWith({
        news: returnValues.news.addDate,
        spotlight: returnValues.spotlight.addDate,
      });
    });
  });

  describe('when database query gives and error', () => {
    afterAll(() => {
      res.send.mockClear();
      res.status.mockClear();
    });

    beforeAll(async (done) => {
      find
        .mockRejectedValueOnce(new Error())
        .mockRejectedValueOnce(new Error());
      homeLoad(req, res)
        .then(() => {
          done();
        });
    });

    it('should return default status', () => {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return null data object', () => {
      expect(res.send).toHaveBeenCalledWith({
        news: null,
        spotlight: null,
      });
    });
  });
});
