import noCache from './no-cache';

const next = jest.fn();
const res = {
  setHeader: jest.fn(),
};

describe('Response headers for a route than should not be cached', () => {
  beforeAll(() => {
    next.mockClear();
    res.setHeader.mockClear();
    noCache(jest.fn(), res, next);
  });

  it('should set three headers', () => {
    expect(res.setHeader).toHaveBeenCalledTimes(3);
  });

  it('should set Cache-Control header', () => {
    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  });

  it('should set Expires header', () => {
    expect(res.setHeader).toHaveBeenCalledWith('Expires', '-1');
  });

  it('should set Pragma header', () => {
    expect(res.setHeader).toHaveBeenCalledWith('Pragma', 'no-cache');
  });

  it('should call next', () => {
    expect(next).toHaveBeenCalled();
  });
});
