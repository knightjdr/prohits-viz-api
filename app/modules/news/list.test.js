const addMongoDate = require('../helpers/add-mongo-date');
const find = require('../db-methods/find');
const list = require('./list');

jest.mock('../helpers/add-mongo-date');
jest.mock('../db-methods/find');

const req = {};
const res = {
  end: jest.fn(),
  send: jest.fn(),
  status: jest.fn(),
};
const returnValues = {
  news: {
    addDate: [{ headline: 1, dbDate: 'a' }, { headline: 2, dbDate: 'b' }],
    find: [{ headline: 1 }, { headline: 2 }],
  },
};

describe('News list', () => {
  describe('when find returns response object', () => {
    afterAll(() => {
      res.end.mockClear();
      res.send.mockClear();
      res.status.mockClear();
    });

    beforeAll(async (done) => {
      find
        .mockResolvedValueOnce(returnValues.news.find);
      addMongoDate.arr
        .mockReturnValueOnce(returnValues.news.addDate);
      list(req, res)
        .then(() => {
          done();
        });
    });

    it('should return default status', () => {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return data object', () => {
      expect(res.send).toHaveBeenCalledWith({
        news: returnValues.news.addDate,
      });
    });
  });

  describe('when there is a news list error', () => {
    afterAll(() => {
      res.end.mockClear();
      res.send.mockClear();
      res.status.mockClear();
    });

    beforeAll(async (done) => {
      find
        .mockRejectedValueOnce(new Error());
      list(req, res)
        .then(() => {
          done();
        });
    });

    afterAll(() => {
      find.mockClear();
    });

    it('should return 500 status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});