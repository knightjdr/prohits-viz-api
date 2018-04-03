const Config = require('./config');

describe('dev config', () => {
  test('load config based on environment', () => {
    // ensure settings object is correct
    expect(Config.env).toBe('test');
  });
});
