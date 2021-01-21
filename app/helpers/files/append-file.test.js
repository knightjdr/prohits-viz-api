import fs from 'fs';
import mockFS from 'mock-fs';

import appendFile from './append-file.js';

mockFS({
  'file.txt': 'text\n',
});

afterAll(() => {
  mockFS.restore();
});

describe('Append file', () => {
  it('should append to a file', async (done) => {
    const content = 'appended text\n';
    const expectedContent = 'text\nappended text\n';
    await appendFile('file.txt', content);
    fs.readFile('file.txt', 'utf8', (err, data) => {
      expect(data).toBe(expectedContent);
      done();
    });
  });

  it('should create and append to a file', async (done) => {
    const content = 'appended text\n';
    const expectedContent = 'appended text\n';
    await appendFile('file-new.txt', content);
    fs.readFile('file-new.txt', 'utf8', (err, data) => {
      expect(data).toBe(expectedContent);
      done();
    });
  });
});
