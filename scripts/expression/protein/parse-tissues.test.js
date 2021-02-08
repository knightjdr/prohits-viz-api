import mockFS from 'mock-fs';
import fs from 'fs';

import parseTissues from './parse-tissues.js';

const infile = {
  d: {
    results: [
      { NORMALIZED_INTENSITY: 1.01, TISSUE_NAME: 'a', UNIPROT_ACCESSION: 1 },
      { NORMALIZED_INTENSITY: 2.01, TISSUE_NAME: 'b cell', UNIPROT_ACCESSION: 2 },
      { NORMALIZED_INTENSITY: 3.01, TISSUE_NAME: 'c', UNIPROT_ACCESSION: 3 },
    ],
  },
};

const expected = `1\ta\t1.01
2\tb\t2.01
3\tc\t3.01\n`;

const mockedFileSystem = {
  'tissue.json': JSON.stringify(infile),
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Parse tissues', () => {
  let tissues;

  beforeAll(async (done) => {
    tissues = await parseTissues('./tissue.json', './parsed.txt', 'w');
    done();
  });

  it('should parse tissue file', () => {
    const data = fs.readFileSync('./parsed.txt', 'utf8');
    expect(data).toEqual(expected);
  });

  it('should return a list of cells', () => {
    expect(tissues).toEqual(['a', 'b', 'c']);
  });
});
