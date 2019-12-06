import urlDetails from './url-details';

describe('URL details', () => {
  it('should return url object when referrer available', () => {
    const expectedUrl = {
      auth: null,
      hash: null,
      host: 'test.org',
      hostname: 'test.org',
      href: 'https://test.org/path?param=myparam',
      path: '/path?param=myparam',
      pathname: '/path',
      port: null,
      protocol: 'https:',
      query: 'param=myparam',
      search: '?param=myparam',
      slashes: true,
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
