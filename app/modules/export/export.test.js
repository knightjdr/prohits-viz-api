const heatmap = require('./heatmap/heatmap');

jest.mock('./heatmap/heatmap');

const exportImage = require('./export');

const res = {
  end: jest.fn(),
  status: jest.fn(),
};

describe('Exporting image', () => {
  it('should call heatmap function when request param is "dotpot"', () => {
    heatmap.mockClear();
    const req = {
      params: { type: 'dotplot' },
    };
    exportImage(req, res);
    expect(heatmap).toHaveBeenCalledWith(req, res);
  });

  it('should call heatmap function when request param is "heatmap"', () => {
    heatmap.mockClear();
    const req = {
      params: { type: 'heatmap' },
    };
    exportImage(req, res);
    expect(heatmap).toHaveBeenCalledWith(req, res);
  });

  describe('when analysis type is not recognized', () => {
    beforeAll(() => {
      heatmap.mockClear();
      res.end.mockClear();
      res.status.mockClear();
      const req = {
        params: { type: 'unkown' },
      };
      exportImage(req, res);
    });

    it('should respond with status code 422', () => {
      expect(res.status).toHaveBeenCalledWith(422);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});