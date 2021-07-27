import noCache from './no-cache.js';
import logger from '../../helpers/logging/logger.js';

jest.mock('../../helpers/logging/logger.js');

const next = jest.fn();
const res = {
  setHeader: jest.fn(),
};

describe('Set response headers for a route than should not be cached', () => {
  describe('successfully', () => {
    beforeAll(() => {
      next.mockClear();
      res.setHeader.mockClear();
      noCache(jest.fn(), res, next);
    });

    it('should set three headers', () => {
      expect(res.setHeader).toHaveBeenCalledTimes(3);
    });

    it('should set Cache-Control header', () => {
      expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    });

    it('should set Expires header', () => {
      expect(res.setHeader).toHaveBeenCalledWith('Expires', '-1');
    });

    it('should set Pragma header', () => {
      expect(res.setHeader).toHaveBeenCalledWith('Pragma', 'no-cache');
    });

    it('should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });

  describe('error', () => {
    beforeAll(() => {
      logger.error.mockClear();
      next.mockClear();
      res.setHeader.mockImplementation(() => {
        throw new Error('setting header');
      });
      noCache(jest.fn(), res, next);
    });

    it('should log error', () => {
      expect(logger.error).toHaveBeenCalledWith('set no cache headers - Error: setting header');
    });

    it('should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });
});
