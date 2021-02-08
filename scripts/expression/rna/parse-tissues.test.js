import mockFS from 'mock-fs';
import fs from 'fs';

import parseTissues from './parse-tissues.js';

const infile = `1\t2\t3\t4\t5
1\tA\tcellA\t20\t
2\tB\tcellB\t40\t`;

const expected = `1\tcellA\t20
2\tcellB\t40\n`;

const mockedFileSystem = {
  'tissue.txt': infile,
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Parse tissues', () => {
  let tissues;

  beforeAll(async (done) => {
    tissues = await parseTissues('./tissue.txt', './parsed.txt', 'w');
    done();
  });

  it('should parse tissue file', () => {
    const data = fs.readFileSync('./parsed.txt', 'utf8');
    expect(data).toEqual(expected);
  });

  it('should return a list of cells', () => {
    expect(tissues).toEqual(['cellA', 'cellB']);
  });
});
