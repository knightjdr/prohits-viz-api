import fs from 'fs/promises';
import mockFS from 'mock-fs';

import Logger from './logger.js';

jest.mock('../../config/config', () => (
  {
    logPrefix: 'test-',
  }
));

// expected messages
const messages = {
  output: {
    combined: /\d+-\d+-\d+, \d+:\d+:\d+ - error: test\n\d+-\d+-\d+, \d+:\d+:\d+ - info: test/,
    error: /\d+-\d+-\d+, \d+:\d+:\d+ - error: test/,
  },
};

// need a short delay after logging before checking tests
const promiseDelay = () => (
  new Promise((resolve) => {
    setTimeout(() => { resolve(); }, 500);
  })
);

mockFS({
  logs: {},
});

afterAll(() => {
  mockFS.restore();
});

describe('Logging', () => {
  beforeAll(() => {
    Logger.error('test');
    Logger.info('test');
  });

  it('should log all messages to combined.log', async () => {
    // need a delay with this test because logger doesn't write immediately
    await promiseDelay();
    const file = await fs.readFile('logs/test-combined.log', 'utf8');
    expect(file).toMatch(messages.output.combined);
  });

  it('should log error messages to error.log', async () => {
    // need a delay with this test because logger doesn't write immediately
    await promiseDelay();
    const file = await fs.readFile('logs/test-error.log', 'utf8');
    expect(file).toMatch(messages.output.error);
  });
});
