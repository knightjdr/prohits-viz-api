import getSocket from './get-socket.js';
import logger from '../../helpers/logging/logger.js';

jest.mock('../../helpers/logging/logger.js');

describe('Get socket', () => {
  describe('request has valid socket object', () => {
    const res = { locals: {} };
    const next = jest.fn();

    beforeAll(() => {
      const req = {
        app: {
          get: () => ({
            sockets: {
              sockets: {
                get: () => 'test',
              },
            },
          }),
        },
        get: () => 'id',
      };
      getSocket(req, res, next);
    });

    it('should add object to res locals', () => {
      expect(res.locals.socket).toBe('test');
    });

    it('should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });

  describe('socket object error', () => {
    const res = {
      end: jest.fn(),
      status: jest.fn(),
    };

    beforeAll(() => {
      logger.error.mockClear();

      const req = {
        app: {
          get: () => ({
            sockets: {
              sockets: { /* Missing get method */ },
            },
          }),
        },
        get: () => 'id',
      };
      getSocket(req, res);
    });

    it('should log error', () => {
      expect(logger.error)
        .toHaveBeenCalledWith('get socket - TypeError: req.app.get(...).sockets.sockets.get is not a function');
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });

    it('should set status code', () => {
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
