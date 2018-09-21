const mockFS = require('mock-fs');

const exists = require('./exists');

// Must mock file system after requires are complete.
mockFS({
  'file.txt': 'file content',
});

const res = {
  end: jest.fn(),
  status: jest.fn(),
};

afterAll(() => {
  mockFS.restore();
});

describe('Download file existence check', () => {
  it('should resolve when file exists', () => (
    expect(exists('file.txt', res)).resolves.toBeUndefined()
  ));

  describe('when file does not exist', () => {
    beforeAll(async (done) => {
      res.end.mockClear();
      res.status.mockClear();
      exists('missing.txt', res)
        .then(() => {
          done();
        });
    });

    it('should set status code', () => {
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should end response', () => {
      expect(res.end).toHaveBeenCalled();
    });
  });
});
