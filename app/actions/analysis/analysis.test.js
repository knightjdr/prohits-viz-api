const createDotplot = require('./dotplot/create');
const gprofiler = require('./gprofiler/gprofiler');

jest.mock('./dotplot/create');
jest.mock('./gprofiler/gprofiler');

const analysis = require('./analysis');

const res = {
  end: jest.fn(),
  status: jest.fn(),
};

describe('Vizualization analysis', () => {
  it('should call dotplot function when request param is "go"', () => {
    createDotplot.mockClear();
    const req = {
      params: { type: 'dotplot' },
    };
    analysis(req, res);
    expect(createDotplot).toHaveBeenCalledWith(req, res);
  });

  it('should call gprofiler function when request param is "go"', () => {
    gprofiler.mockClear();
    const req = {
      params: { type: 'go' },
    };
    analysis(req, res);
    expect(gprofiler).toHaveBeenCalledWith(req, res);
  });

  describe('when analysis type is not recognized', () => {
    beforeAll(() => {
      gprofiler.mockClear();
      res.end.mockClear();
      res.status.mockClear();
      const req = {
        params: { type: 'unkown' },
      };
      analysis(req, res);
    });

    it('should respond with status code 422', () => {
      expect(res.status).toHaveBeenCalledWith(422);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
