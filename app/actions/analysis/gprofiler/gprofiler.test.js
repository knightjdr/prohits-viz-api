const emitAction = require('./emit-action');
const fetch = require('../../../utils/fetch');
const gprofiler = require('./gprofiler');
const validateGprofilerOptions = require('./validation/validate');

jest.mock('./emit-action');
jest.mock('../../../utils/fetch');
jest.mock('./validation/validate');

const req = {
  body: {
    analysisName: 'analysis-test',
  },
};
const res = {
  end: jest.fn(),
  locals: {
    socket: { emit: jest.fn() },
  },
  status: jest.fn(),
};

describe('g:Profiler anlaysis', () => {
  describe('successful fetch', () => {
    beforeAll(async () => {
      emitAction.mockClear();
      fetch.mockClear();
      res.end.mockClear();
      validateGprofilerOptions.mockReturnValue({ setting: true });
      fetch.mockResolvedValue({ data: { results: [] } });

      await gprofiler(req, res);
    });

    it('should call fetch', () => {
      const fetchOptions = {
        data: { setting: true },
        method: 'POST',
      };
      const url = 'https://biit.cs.ut.ee/gprofiler/api/gost/profile/';
      expect(fetch).toHaveBeenCalledWith(url, fetchOptions);
    });

    it('should emit action', () => {
      const formattedResponse = { data: { results: [] } };
      expect(emitAction).toHaveBeenCalledWith(res.locals.socket, 'analysis-test', null, formattedResponse);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe('unsuccessful fetch', () => {
    beforeAll(async () => {
      emitAction.mockClear();
      fetch.mockClear();
      res.end.mockClear();
      validateGprofilerOptions.mockReturnValue({ setting: true });
      fetch.mockRejectedValue(new Error('fetch error'));

      await gprofiler(req, res);
    });

    it('should call fetch', () => {
      const fetchOptions = {
        data: { setting: true },
        method: 'POST',
      };
      const url = 'https://biit.cs.ut.ee/gprofiler/api/gost/profile/';
      expect(fetch).toHaveBeenCalledWith(url, fetchOptions);
    });

    it('should emit action', () => {
      const err = new Error('fetch error');
      expect(emitAction).toHaveBeenCalledWith(res.locals.socket, 'analysis-test', err);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
