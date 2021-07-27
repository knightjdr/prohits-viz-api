import addMongoDate from '../../utils/add-mongo-date.js';
import find from '../../helpers/database/find.js';
import getHomeContent from './get-home-content.js';
import logger from '../../helpers/logging/logger.js';

jest.mock('../../utils/add-mongo-date');
jest.mock('../../helpers/database/find');
jest.mock('../../helpers/logging/logger.js');

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

    beforeAll(async () => {
      find
        .mockResolvedValueOnce(returnValues.news.find)
        .mockResolvedValueOnce(returnValues.spotlight.find);
      addMongoDate.arr
        .mockReturnValueOnce(returnValues.news.addDate)
        .mockReturnValueOnce(returnValues.spotlight.addDate);
      await getHomeContent(req, res);
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

    beforeAll(async () => {
      logger.error.mockClear();
      find
        .mockRejectedValueOnce(new Error('error accessing news'))
        .mockRejectedValueOnce(new Error('error accessing spotlight'));
      await getHomeContent(req, res);
    });

    it('should log error', () => {
      expect(logger.error).toHaveBeenCalledWith('home content - Error: error accessing news');
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
