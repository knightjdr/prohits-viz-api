import fs from 'fs';
import mockFS from 'mock-fs';

import Logger from './logger';

jest.mock('../../config/config', () => (
  {
    logPrefix: 'test-',
  }
));

// expected messages
const messages = {
  output: {
    combined: /\d+-\d+-\d+, \d+:\d+:\d+ [apm.]+ - error: test\n\d+-\d+-\d+, \d+:\d+:\d+ [apm.]+ - info: test/,
    error: /\d+-\d+-\d+, \d+:\d+:\d+ [apm.]+ - error: test/,
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
    const file = fs.readFileSync('logs/test-combined.log', 'utf8');
    expect(file).toMatch(messages.output.combined);
  });

  it('should log error messages to error.log', async () => {
    // need a delay with this test because logger doesn't write immediately
    await promiseDelay();
    const file = fs.readFileSync('logs/test-error.log', 'utf8');
    expect(file).toMatch(messages.output.error);
  });
});
