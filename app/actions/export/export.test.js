import exportImage from './export.js';
import heatmap from './heatmap/heatmap.js';

jest.mock('./heatmap/heatmap');

const res = {
  end: jest.fn(),
  status: jest.fn(),
};

describe('Exporting image', () => {
  it('should call heatmap function when request param is "dotplot"', () => {
    heatmap.mockClear();
    const req = {
      body: { imageType: 'dotplot' },
    };
    exportImage(req, res);
    expect(heatmap).toHaveBeenCalledWith(req, res);
  });

  it('should call heatmap function when request param is "heatmap"', () => {
    heatmap.mockClear();
    const req = {
      body: { imageType: 'heatmap' },
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
        body: { imageType: 'unknown' },
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
