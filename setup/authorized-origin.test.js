const checkUserAuth = require('../app/modules/third-party/auth/check-user-auth');
const { isRequestAuthorized } = require('./authorized-origin');

jest.mock('../app/modules/third-party/auth/check-user-auth');


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
const sleep = ms => (
  new Promise(resolve => setTimeout(resolve, ms))
);

describe('Check if request is authorized', () => {
  it('should authorize a GET request', () => {
    const request = {
      ...req,
      method: 'GET',
    };
    expect(isRequestAuthorized(request)).toBeTruthy();
  });

  describe('POST requests', () => {
    it('should authorize a request with a valid session ID', () => {
      const request = {
        ...req,
        method: 'POST',
      };
      const sessions = ['session-1', 'session-2', 'session-3'];
      const sessionID = 'session-2';
      expect(isRequestAuthorized(request, sessions, sessionID)).toBeTruthy();
    });

    it('should not authorize a request with a invalid session ID', () => {
      const request = {
        ...req,
        method: 'POST',
      };
      const sessions = ['session-1', 'session-2', 'session-3'];
      const sessionID = 'session-4';
      expect(isRequestAuthorized(request, sessions, sessionID)).toBeFalsy();
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
      expect(isRequestAuthorized(request, sessions)).toBeTruthy();
    });

    it('should not authorize a third party with invalid credentials', () => {
      checkUserAuth.mockReturnValue(false);
      const request = {
        ...req,
        method: 'POST',
        originalUrl: 'third-party',
      };
      const sessions = [];
      expect(isRequestAuthorized(request, sessions)).toBeFalsy();
    });

    it('should not authorize a third party with an invalid url', () => {
      checkUserAuth.mockReturnValue(true);
      const request = {
        ...req,
        method: 'POST',
        originalUrl: 'some-other-route',
      };
      const sessions = [];
      expect(isRequestAuthorized(request, sessions)).toBeFalsy();
    });
  });

  it('should not authorize INSERT method', () => {
    const request = {
      ...req,
      method: 'INSERT',
    };
    const sessions = [];
    expect(isRequestAuthorized(request, sessions)).toBeFalsy();
  });

  it('should not authorize DELETE method', () => {
    const request = {
      ...req,
      method: 'DELETE',
    };
    const sessions = [];
    expect(isRequestAuthorized(request, sessions)).toBeFalsy();
  });
});
