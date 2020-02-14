import config from './config.js';

describe('dev config', () => {
  test('load config based on environment', () => {
    // ensure settings object is correct
    expect(config.env).toBe('test');
  });
});
