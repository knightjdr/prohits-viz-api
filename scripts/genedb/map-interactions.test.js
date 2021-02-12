import fs from 'fs/promises';
import mockFS from 'mock-fs';

import mapInteractions from './map-interactions.js';

const interactionData = {
  111: ['222', '333', '444'],
  222: ['111', '444'],
  333: ['111'],
  444: ['111', '222'],
};

const mockedFileSystem = {
  files: {
    unmapped: { 'interactions.json': JSON.stringify(interactionData) },
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Map interactions to HGNC ID', () => {
  it('should map data and write to file', async () => {
    const geneData = {
      1: { entrez: '111' },
      2: { entrez: '222' },
      4: { entrez: '444' },
    };
    const infile = 'files/unmapped/interactions.json';
    const outfile = 'files/interactions.json';

    const expected = {
      1: ['2', '4'],
      2: ['1', '4'],
      4: ['1', '2'],
    };

    await mapInteractions(infile, outfile, geneData);
    const actual = await fs.readFile(outfile, 'utf8');
    expect(JSON.parse(actual)).toEqual(expected);
  });
});
