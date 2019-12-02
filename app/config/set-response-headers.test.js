const setResponseHeaders = require('./set-response-headers');

const next = jest.fn();
const res = {
  setHeader: jest.fn(),
};

describe('Resonse headers', () => {
  beforeAll(() => {
    res.setHeader.mockClear();
    setResponseHeaders(jest.fn(), res, next);
  });

  it('should set three headers', () => {
    expect(res.setHeader).toHaveBeenCalledTimes(3);
  });

  it('should set XSS header', () => {
    expect(res.setHeader).toHaveBeenCalledWith('X-XSS-Protection', '1;mode=block');
  });

  it('should set X-frame header', () => {
    expect(res.setHeader).toHaveBeenCalledWith('X-Frame-Options', 'SAMEORIGIN');
  });

  it('should set nosniff header', () => {
    expect(res.setHeader).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
  });
});
