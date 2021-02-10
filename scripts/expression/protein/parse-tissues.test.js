import mockFS from 'mock-fs';

import parseTissues from './parse-tissues.js';

const infile = {
  d: {
    results: [
      { NORMALIZED_INTENSITY: 1.01, TISSUE_NAME: 'a', UNIPROT_ACCESSION: 1 },
      { NORMALIZED_INTENSITY: 2.01, TISSUE_NAME: 'b cell', UNIPROT_ACCESSION: 1 },
      { NORMALIZED_INTENSITY: 2.01, TISSUE_NAME: 'b cell', UNIPROT_ACCESSION: 2 },
      { NORMALIZED_INTENSITY: 3.01, TISSUE_NAME: 'c', UNIPROT_ACCESSION: 3 },
    ],
  },
};

const mockedFileSystem = {
  'tissue.json': JSON.stringify(infile),
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Parse tissues', () => {
  let data;

  beforeAll(async () => {
    data = await parseTissues('./tissue.json');
  });

  it('should return expression data', () => {
    const expected = {
      1: { a: 1.01, b: 2.01 },
      2: { b: 2.01 },
      3: { c: 3.01 },
    };
    expect(data.expression).toEqual(expected);
  });

  it('should return tissue array', () => {
    const expected = ['a', 'b', 'c'];
    expect(data.tissues).toEqual(expected);
  });
});
