import mockFS from 'mock-fs';
import fs from 'fs';

import writeArray from './write-array.js';

const expected = `/* eslint quotes: 0 */

const arr = [
  "a",
  "b",
  "c",
];

export default arr;

`;

const mockedFileSystem = {};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Write an array to file', () => {
  it('should write an array of string to a file', async () => {
    await writeArray(['a', 'b', 'c'], './file.js', 'arr');
    const data = fs.readFileSync('./file.js', 'utf8');
    expect(data).toBe(expected);
  });
});
