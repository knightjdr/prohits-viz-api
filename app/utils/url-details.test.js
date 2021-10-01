import urlDetails from './url-details.js';

describe('URL details', () => {
  it('should return url object when referrer available', () => {
    const expectedUrl = {
      host: 'test.org',
    };
    const req = {
      get: () => 'https://test.org/path?param=myparam',
    };
    const url = urlDetails(req);
    expect(url).toEqual(expectedUrl);
  });

  it('should return empty object when referrer not available', () => {
    const expectedUrl = {};
    const req = {
      get: () => undefined,
    };
    const url = urlDetails(req);
    expect(url).toEqual(expectedUrl);
  });
});
