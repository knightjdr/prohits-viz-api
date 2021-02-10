import mockFS from 'mock-fs';

import parseTissues from './parse-tissues.js';

const infile = `1\t2\t3\t4\t5
1\tA\tcellA\t20\t
1\tA\tcellB\t30\t
2\tB\tcellB\t40\t`;

const mockedFileSystem = {
  'tissue.txt': infile,
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Parse tissues', () => {
  let data;

  beforeAll(async () => {
    data = await parseTissues('./tissue.txt');
  });

  it('should return expression data', () => {
    const expected = {
      1: { cellA: 20, cellB: 30 },
      2: { cellB: 40 },
    };
    expect(data.expression).toEqual(expected);
  });

  it('should return tissue array', () => {
    const expected = ['cellA', 'cellB'];
    expect(data.tissues).toEqual(expected);
  });
});
