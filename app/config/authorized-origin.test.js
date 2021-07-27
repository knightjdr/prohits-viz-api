import checkUserAuth from '../helpers/third-party/check-user-auth.js';
import logger from '../helpers/logging/logger.js';
import { isOriginAuthorized, isRequestAuthorized } from './authorized-origin.js';

jest.mock('../helpers/third-party/check-user-auth');
jest.mock('../helpers/logging/logger.js');

const next = jest.fn();
const req = {
  app: {
    get: function get(key) { return this[key]; },
    sessions: ['session1', 'session2'],
  },
  get: function get(key) { return this[key]; },
  originalUrl: '',
};
const res = {
  end: jest.fn(),
  status: jest.fn(),
};

describe('Check if request is authorized', () => {
  it('should authorize a GET request', () => {
    const request = {
      ...req,
      method: 'GET',
    };
    return expect(isRequestAuthorized(request)).resolves.toBeTruthy();
  });

  describe('POST requests', () => {
    it('should authorize a request with a valid session ID', () => {
      const request = {
        ...req,
        method: 'POST',
      };
      const sessions = ['session-1', 'session-2', 'session-3'];
      const sessionID = 'session-2';
      return expect(isRequestAuthorized(request, sessions, sessionID)).resolves.toBeTruthy();
    });

    it('should not authorize a request with a invalid session ID', () => {
      const request = {
        ...req,
        method: 'POST',
      };
      const sessions = ['session-1', 'session-2', 'session-3'];
      const sessionID = 'session-4';
      return expect(isRequestAuthorized(request, sessions, sessionID)).resolves.toBeFalsy();
    });
  });

  describe('Third party urls', () => {
    it('should authorize a third party with a valid url and credentials', () => {
      checkUserAuth.mockReturnValue(true);
      const request = {
        ...req,
        method: 'POST',
        originalUrl: 'third-party',
      };
      const sessions = [];
      return expect(isRequestAuthorized(request, sessions)).resolves.toBeTruthy();
    });

    it('should not authorize a third party with invalid credentials', () => {
      checkUserAuth.mockReturnValue(false);
      const request = {
        ...req,
        method: 'POST',
        originalUrl: 'third-party',
      };
      const sessions = [];
      return expect(isRequestAuthorized(request, sessions)).resolves.toBeFalsy();
    });

    it('should not authorize a third party with an invalid url', () => {
      checkUserAuth.mockReturnValue(true);
      const request = {
        ...req,
        method: 'POST',
        originalUrl: 'some-other-route',
      };
      const sessions = [];
      return expect(isRequestAuthorized(request, sessions)).resolves.toBeFalsy();
    });
  });

  it('should not authorize INSERT method', () => {
    const request = {
      ...req,
      method: 'INSERT',
    };
    const sessions = [];
    return expect(isRequestAuthorized(request, sessions)).resolves.toBeFalsy();
  });

  it('should not authorize DELETE method', () => {
    const request = {
      ...req,
      method: 'DELETE',
    };
    const sessions = [];
    return expect(isRequestAuthorized(request, sessions)).resolves.toBeFalsy();
  });
});

describe('Check if origin is authorized', () => {
  describe('authorized origin', () => {
    beforeAll(async () => {
      next.mockClear();
      const request = {
        ...req,
        method: 'GET',
      };
      await isOriginAuthorized(request, res, next);
    });

    it('should call next', () => {
      expect(next).toHaveBeenCalled();
    });
  });

  describe('forbidden origin', () => {
    beforeAll(async () => {
      next.mockClear();
      res.end.mockClear();
      res.status.mockClear();
      checkUserAuth.mockReturnValue(false);
      const request = {
        ...req,
        method: 'POST',
        originalUrl: 'third-party',
      };
      await isOriginAuthorized(request, res, next);
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe('server error', () => {
    beforeAll(async () => {
      logger.error.mockClear();
      res.end.mockClear();
      res.status.mockClear();
      checkUserAuth.mockImplementation(() => {
        throw new Error('cannot check auth');
      });
      const request = {
        ...req,
        method: 'POST',
        originalUrl: 'third-party',
      };
      const sessions = [];
      await isOriginAuthorized(request, res, sessions);
    });

    it('should log error', () => {
      expect(logger.error).toHaveBeenCalledWith('origin authorization - Error: cannot check auth');
    });

    it('should set response status', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
