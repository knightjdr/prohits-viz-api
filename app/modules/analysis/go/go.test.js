require('isomorphic-fetch');
const fetchMock = require('fetch-mock');

const convertToForm = require('../convert-to-form');
const parseText = require('./parse-text');
const validate = require('./validate');

jest.mock('isomorphic-fetch');
jest.mock('./parse-text');
jest.mock('../convert-to-form');

convertToForm.mockReturnValue('form');
const validateGoOrig = validate.validateGo;
validate.validateGo = jest.fn().mockReturnValue({});

// Module under test.
const go = require('./go');

const req = {
  body: 'body',
};
const res = {
  end: jest.fn(),
  locals: {
    socket: { emit: jest.fn() },
  },
  status: jest.fn(),
};

afterAll(() => {
  fetchMock.restore();
  validate.validateGo = validateGoOrig;
});

describe('GO anlaysis', () => {
  describe('with succesful fetch', () => {
    beforeAll(async (done) => {
      fetchMock.postOnce('*', 'text');
      parseText.mockResolvedValue({});
      go(req, res).then(() => {
        done();
      });
    });

    it('should resolve with default status', () => {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });

    it('should validate request body', () => {
      expect(validate.validateGo).toHaveBeenCalledWith('body');
    });

    it('should convert body to form', () => {
      expect(convertToForm).toHaveBeenCalledWith({});
    });

    it('should use gProfiler', () => {
      expect(fetchMock.lastUrl()).toBe('https://biit.cs.ut.ee/gprofiler/index.cgi');
    });

    it('should call fetch with correct body', () => {
      expect(fetchMock.lastOptions().body).toBe('form');
    });

    it('should call fetch with correct headers', () => {
      const expectedHeaders = {
        Accept: 'text/plain',
      };
      expect(fetchMock.lastOptions().headers).toEqual(expectedHeaders);
    });

    it('should emit socket event', () => {
      const action = {
        analysisType: 'go',
        results: {},
        type: 'SET_VIZ_ANALYSIS_RESULTS',
      };
      expect(res.locals.socket.emit).toHaveBeenCalledWith('action', action);
    });
  });

  describe('with failed fetch', () => {
    beforeAll(async (done) => {
      fetchMock.postOnce('*', 400, { overwriteRoutes: true });
      go(req, res).then(() => {
        done();
      });
    });

    it('should resolve with default status', () => {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });

    it('should emit socket event', () => {
      const action = {
        analysisType: 'go',
        type: 'VIZ_ANALYSIS_ERROR',
      };
      expect(res.locals.socket.emit).toHaveBeenCalledWith('action', action);
    });
  });
});
