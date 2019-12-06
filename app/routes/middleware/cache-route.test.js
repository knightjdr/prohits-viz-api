import mcache from 'memory-cache';

import cacheRoute from './cache-route';

jest.mock('memory-cache', () => ({
  get: jest.fn(),
  put: jest.fn(),
}));
jest.mock('../../config/config', () => ({
  routeCacheTime: 10000,
}));

// Mock date
const timeStamp = Date.now();
const OrigNow = Date.now;
global.Date.now = jest.fn(() => timeStamp);

afterAll(() => {
  global.Date.now = OrigNow;
});

const next = jest.fn();
const res = {
  send: jest.fn(),
  setHeader: jest.fn(),
};

describe('Cache route content', () => {
  describe('route already cached', () => {
    beforeAll(() => {
      mcache.get.mockReturnValue('cached-value');
      next.mockClear();
      res.setHeader.mockClear();

      const req = { originalUrl: 'route' };
      cacheRoute(req, res, next);
    });

    it('should set response header', () => {
      const utcDate = new Date(timeStamp + 10000).toUTCString();
      expect(res.setHeader).toHaveBeenCalledWith('Expires', utcDate);
    });

    it('should send cached response', () => {
      expect(res.send).toHaveBeenCalledWith('cached-value');
    });

    it('should not call next', () => {
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('route not cached', () => {
    beforeAll(() => {
      mcache.get.mockReturnValue(undefined);
      mcache.put.mockClear();
      next.mockClear();
      res.setHeader.mockClear();

      const req = { url: 'route' };
      cacheRoute(req, res, next);
    });

    it('should set response header', () => {
      const utcDate = new Date(timeStamp + 10000).toUTCString();
      expect(res.setHeader).toHaveBeenCalledWith('Expires', utcDate);
    });

    it('should call next', () => {
      expect(next).toHaveBeenCalled();
    });

    it('should cache result when send is called', () => {
      const body = { response: 'data' };
      res.send(body);
      expect(mcache.put).toHaveBeenCalledWith('__express__route', body, 10000);
    });
  });
});
