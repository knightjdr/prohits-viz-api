const mockFS = require('mock-fs');
const fs = require('fs');

const writeObjArray = require('./write-obj-array');

const expected = `/* eslint quotes: 0 */

const obj = {
  cells: [
    "a",
    "b",
  ],
  tissues: [
    "c",
    "d",
  ],
};

export default obj;

`;

const mockedFileSystem = {};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Write an obj with array values to file', () => {
  it('should write an object of arrays to a file', async () => {
    const obj = {
      cells: ['a', 'b'],
      tissues: ['c', 'd'],
    };
    await writeObjArray(obj, './file.js', 'obj');
    const data = fs.readFileSync('./file.js', 'utf8');
    expect(data).toBe(expected);
  });
});
