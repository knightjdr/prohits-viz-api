process.env.NODE_ENV = 'production';
const authorizedOrigin = require('./authorized-origin');

const next = jest.fn();
const res = {
  end: jest.fn(),
  status: jest.fn(),
};

describe('Autorized origin', () => {
  describe('prohits-viz origin', () => {
    describe('accesing non-third party endpoint', () => {
      beforeAll(() => {
        next.mockClear();
        const req = {
          originalUrl: '/api/anything',
          get: () => 'https://prohits-viz.org/',
        };
        authorizedOrigin(req, res, next);
      });

      it('should call next', () => {
        expect(next).toHaveBeenCalled();
      });
    });

    describe('accesing third party endpoint', () => {
      beforeAll(() => {
        next.mockClear();
        const req = {
          originalUrl: '/api/third-party/anything',
          get: () => 'https://prohits-viz.org/',
        };
        authorizedOrigin(req, res, next);
      });

      it('should call next', () => {
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('other origin', () => {
    describe('accesing non-third party endpoint', () => {
      beforeAll(() => {
        next.mockClear();
        res.end.mockClear();
        res.status.mockClear();
        const req = {
          originalUrl: '/api/anything',
          get: () => 'https://other.ca/',
        };
        authorizedOrigin(req, res, next);
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

    describe('accesing third party endpoint', () => {
      beforeAll(() => {
        next.mockClear();
        const req = {
          originalUrl: '/api/third-party/anything',
          get: () => 'https://other.ca/',
        };
        authorizedOrigin(req, res, next);
      });

      it('should call next', () => {
        expect(next).toHaveBeenCalled();
      });
    });
  });
});
