const addMongoDate = require('../helpers/add-mongo-date');
const findOne = require('../db-methods/find-one');
const article = require('./article');

jest.mock('../helpers/add-mongo-date');
jest.mock('../db-methods/find-one');

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

describe('News article', () => {
  describe('when there is a matching headline', () => {
    afterAll(() => {
      res.end.mockClear();
      res.send.mockClear();
      res.status.mockClear();
    });

    beforeAll(async (done) => {
      findOne
        .mockResolvedValueOnce(returnValues.news.find[0]);
      addMongoDate.obj
        .mockReturnValueOnce(returnValues.news.addDate[0]);

      const req = { params: { headline: 'title' } };
      article(req, res)
        .then(() => {
          done();
        });
    });

    it('should return default status', () => {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return correct item', () => {
      expect(res.send).toHaveBeenCalledWith({
        news: returnValues.news.addDate[0],
      });
    });
  });

  describe('when there is no news item matching title', () => {
    afterAll(() => {
      res.end.mockClear();
      res.send.mockClear();
      res.status.mockClear();
    });

    beforeAll(async (done) => {
      findOne
        .mockResolvedValueOnce(null);
      const req = { params: { headline: 'title missing' } };
      article(req, res)
        .then(() => {
          done();
        });
    });

    it('should return 204 status', () => {
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe('when there is a news item error', () => {
    afterAll(() => {
      res.end.mockClear();
      res.send.mockClear();
      res.status.mockClear();
    });

    beforeAll(async (done) => {
      findOne
        .mockRejectedValueOnce(new Error());
      const req = { params: { headline: 'title' } };
      article(req, res)
        .then(() => {
          done();
        });
    });

    it('should return 500 status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
