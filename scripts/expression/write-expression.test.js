import mockFS from 'mock-fs';
import fs from 'fs/promises';

import writeExpression from './write-expression.js';

const mockedFileSystem = {};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Write expression data', () => {
  it('should merge and write expression data to a file', async () => {
    const expression = {
      cells: {
        111: { a: 1, b: 2 },
        222: { a: 1.02, b: 2.02 },
      },
      tissues: {
        111: { c: 3 },
        333: { c: 3.03 },
      },
    };
    const outfile = 'expression.json';

    const expected = {
      111: { a: 1, b: 2, c: 3 },
      222: { a: 1.02, b: 2.02 },
      333: { c: 3.03 },
    };

    await writeExpression(expression, outfile);
    const data = await fs.readFile('./expression.json', 'utf8');
    expect(JSON.parse(data)).toEqual(expected);
  });
});
