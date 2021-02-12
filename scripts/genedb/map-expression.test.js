import fs from 'fs/promises';
import mockFS from 'mock-fs';

import mapExpression from './map-expression.js';

const expressionData = {
  P11111: { HeLa: 3, 'HEK-293': 4 },
  P22222: { HeLa: 4, 'HEK-293': 5 },
  P33333: { HeLa: 5, 'HEK-293': 5 },
};

const mockedFileSystem = {
  files: {
    unmapped: { 'protein-expression.json': JSON.stringify(expressionData) },
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Map protein expresison data to HGNC ID', () => {
  it('should map data and write to file', async () => {
    const field = 'uniprotacc';
    const geneData = {
      1: { uniprotacc: ['P11111'] },
      3: { uniprotacc: ['P33333'] },
    };
    const infile = 'files/unmapped/protein-expression.json';
    const outfile = 'files/protein-expression.json';

    const expected = {
      1: { HeLa: 3, 'HEK-293': 4 },
      3: { HeLa: 5, 'HEK-293': 5 },
    };

    await mapExpression(infile, outfile, geneData, field);
    const actual = await fs.readFile(outfile, 'utf8');
    expect(JSON.parse(actual)).toEqual(expected);
  });
});
