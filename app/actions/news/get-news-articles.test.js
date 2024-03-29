import addMongoDate from '../../utils/add-mongo-date.js';
import find from '../../helpers/database/find.js';
import getNewsArticles from './get-news-articles.js';
import logger from '../../helpers/logging/logger.js';

jest.mock('../../utils/add-mongo-date');
jest.mock('../../helpers/database/find');
jest.mock('../../helpers/logging/logger.js');

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
    beforeAll(async () => {
      res.send.mockClear();
      res.status.mockClear();
      find.mockResolvedValueOnce(returnValues.news.find);
      addMongoDate.arr.mockReturnValueOnce(returnValues.news.addDate);
      await getNewsArticles(req, res);
    });

    it('should return default status', () => {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return data object', () => {
      expect(res.send).toHaveBeenCalledWith(returnValues.news.addDate);
    });
  });

  describe('when there is a news list error', () => {
    beforeAll(async () => {
      logger.error.mockClear();
      res.end.mockClear();
      res.status.mockClear();
      find.mockRejectedValueOnce(new Error('cannot access news'));
      await getNewsArticles(req, res);
    });

    afterAll(() => {
      find.mockClear();
    });

    it('should log error', () => {
      expect(logger.error).toHaveBeenCalledWith('news articles - Error: cannot access news');
    });

    it('should return 500 status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
