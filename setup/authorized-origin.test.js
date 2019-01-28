const validateThirdParty = require('../app/modules/third-party/auth/auth');

jest.mock('../app/modules/third-party/auth/auth');

const { authorizedOrigin, forbidden } = require('./authorized-origin');

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

describe('Forbidden response', () => {
  beforeAll(() => {
    res.end.mockClear();
    res.status.mockClear();
    forbidden(res);
  });

  it('should set response status', () => {
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it('should end response', () => {
    expect(res.end).toHaveBeenCalled();
  });
});

describe('Authorized origin', () => {
  it('should call next for GET method', () => {
    next.mockClear();
    const request = {
      ...req,
      method: 'GET',
      session: '2',
    };
    authorizedOrigin(request, res, next);
    expect(next).toHaveBeenCalled();
  });

  describe('accessing endpoint with POST method', () => {
    it('should call next when socket ID is valid', () => {
      next.mockClear();
      const request = {
        ...req,
        method: 'POST',
        session: 'session1',
      };
      authorizedOrigin(request, res, next);
      expect(next).toHaveBeenCalled();
    });

    describe('when socket ID is not valid', () => {
      beforeAll(() => {
        next.mockClear();
        res.end.mockClear();
        res.status.mockClear();
        const request = {
          ...req,
          method: 'POST',
          session: 'session3',
        };
        authorizedOrigin(request, res, next);
      });

      it('should not call next', () => {
        expect(next).not.toHaveBeenCalled();
      });

      it('should set response status', () => {
        expect(res.status).toHaveBeenCalledWith(403);
      });

      it('should end response', () => {
        expect(res.end).toHaveBeenCalled();
      });
    });
  });

  describe('accessing third party endpoint', () => {
    let request;

    beforeAll(() => {
      request = {
        ...req,
        method: 'POST',
        originalUrl: 'third-party',
      };
    });

    it('should call next when credentials validated', async () => {
      next.mockClear();
      validateThirdParty.mockResolvedValue();
      authorizedOrigin(request, res, next);
      await sleep(200);
      expect(next).toHaveBeenCalled();
    });

    describe('invalid credentials', () => {
      beforeAll(async (done) => {
        res.end.mockClear();
        res.status.mockClear();
        validateThirdParty.mockRejectedValue();
        authorizedOrigin(request, res, next);
        await sleep(200);
        done();
      });

      it('should set response status', () => {
        expect(res.status).toHaveBeenCalledWith(403);
      });

      it('should end response', () => {
        expect(res.end).toHaveBeenCalled();
      });
    });
  });
});
