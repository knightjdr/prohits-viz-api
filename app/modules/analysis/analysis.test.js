const go = require('./go/go');

jest.mock('./go/go');

const analysis = require('./analysis');

const res = {
  end: jest.fn(),
  status: jest.fn(),
};

describe('Vizualization analysis', () => {
  it('should call go function when request param is "go"', () => {
    go.mockClear();
    const req = {
      params: { type: 'go' },
    };
    analysis(req, res);
    expect(go).toHaveBeenCalledWith(req, res);
  });

  describe('when analysis type is not recognized', () => {
    beforeAll(() => {
      go.mockClear();
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
