import logger from '../helpers/logging/logger.js';
import setResponseHeaders from './set-response-headers.js';

jest.mock('../helpers/logging/logger.js');

const next = jest.fn();
const res = {
  end: jest.fn(),
  setHeader: jest.fn(),
  status: jest.fn(),
};

describe('Resonse headers', () => {
  describe('successfully set', () => {
    beforeAll(() => {
      res.setHeader.mockClear();
      setResponseHeaders(jest.fn(), res, next);
    });

    it('should set three headers', () => {
      expect(res.setHeader).toHaveBeenCalledTimes(3);
    });

    it('should set XSS header', () => {
      expect(res.setHeader).toHaveBeenCalledWith('X-XSS-Protection', '1;mode=block');
    });

    it('should set X-frame header', () => {
      expect(res.setHeader).toHaveBeenCalledWith('X-Frame-Options', 'SAMEORIGIN');
    });

    it('should set nosniff header', () => {
      expect(res.setHeader).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
    });
  });

  describe('unsuccessfully set', () => {
    beforeAll(() => {
      logger.error.mockClear();
      res.end.mockClear();
      res.status.mockClear();
      res.setHeader.mockImplementation(() => {
        throw new Error('cannot set response header');
      });
      setResponseHeaders(jest.fn(), res, next);
    });

    it('should log error', () => {
      expect(logger.error).toHaveBeenCalledWith('response headers - Error: cannot set response header');
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
