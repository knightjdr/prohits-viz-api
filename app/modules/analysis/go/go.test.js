require('isomorphic-fetch');
const fetchMock = require('fetch-mock');

const convertToForm = require('../convert-to-form');
const parseText = require('./parse-text');
const validate = require('./validate');

jest.mock('isomorphic-fetch');
jest.mock('./parse-text');
jest.mock('../to-form');

convertToForm.mockReturnValue('form');
const validateGoOrig = validate.validateGo;
validate.validateGo = jest.fn().mockReturnValue({});

// Module under test.
const go = require('./go');

const socket = {
  emit: jest.fn(),
};

afterAll(() => {
  fetchMock.restore();
  validate.validateGo = validateGoOrig;
});

describe('GO anlaysis', () => {
  describe('with succesfuly fetch', () => {
    let resolvedResult;

    beforeAll(async (done) => {
      fetchMock.postOnce('*', 'text');
      parseText.mockResolvedValue({});
      go(socket, 'body').then((result) => {
        resolvedResult = result;
        done();
      });
    });

    it('should resolve with status 200', () => {
      expect(resolvedResult.status).toBe(200);
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
      expect(socket.emit).toHaveBeenCalledWith('action', action);
    });
  });

  describe('with succesfuly fetch', () => {
    let resolvedResult;

    beforeAll(async (done) => {
      fetchMock.postOnce('*', 400, { overwriteRoutes: true });
      go(socket, 'body').then((result) => {
        resolvedResult = result;
        done();
      });
    });

    it('should resolve with status 200', () => {
      expect(resolvedResult.status).toBe(200);
    });

    it('should emit socket event', () => {
      const action = {
        analysisType: 'go',
        type: 'VIZ_ANALYSIS_ERROR',
      };
      expect(socket.emit).toHaveBeenCalledWith('action', action);
    });
  });
});
