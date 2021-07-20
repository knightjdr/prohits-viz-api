import fs from 'fs/promises';
import mockFS from 'mock-fs';

import mapDomains from './map-domains.js';

const domainData = {
  P00505: [
    { name: 'Aminotran_1_2', start: 57, end: 425 },
  ],
  P00519: [
    { name: 'SH2', start: 127, end: 202 },
    { name: 'SH3_1', start: 67, end: 113 },
    { name: 'F_actin_bind', start: 1025, end: 1130 },
    { name: 'PK_Tyr_Ser-Thr', start: 242, end: 493 },
  ],
  P00533: [
    { name: 'Furin-like', start: 177, end: 338 },
    { name: 'Recep_L_domain', start: 57, end: 168 },
    { name: 'Recep_L_domain', start: 361, end: 481 },
    { name: 'GF_recep_IV', start: 505, end: 637 },
    { name: 'PK_Tyr_Ser-Thr', start: 712, end: 968 },
  ],
};

const mockedFileSystem = {
  files: {
    unmapped: { 'domains.json': JSON.stringify(domainData) },
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Map domain data to HGNC ID', () => {
  it('should map data and write to file', async () => {
    const geneData = {
      4433: { uniprotacc: ['P00505'] },
      76: { uniprotacc: ['P00519'] },
      3236: { uniprotacc: ['P00533'] },
    };
    const infile = 'files/unmapped/domains.json';
    const outfile = 'files/domains.json';

    const expected = {
      4433: [
        { name: 'Aminotran_1_2', start: 57, end: 425 },
      ],
      76: [
        { name: 'SH2', start: 127, end: 202 },
        { name: 'SH3_1', start: 67, end: 113 },
        { name: 'F_actin_bind', start: 1025, end: 1130 },
        { name: 'PK_Tyr_Ser-Thr', start: 242, end: 493 },
      ],
      3236: [
        { name: 'Furin-like', start: 177, end: 338 },
        { name: 'Recep_L_domain', start: 57, end: 168 },
        { name: 'Recep_L_domain', start: 361, end: 481 },
        { name: 'GF_recep_IV', start: 505, end: 637 },
        { name: 'PK_Tyr_Ser-Thr', start: 712, end: 968 },
      ],
    };

    await mapDomains(infile, outfile, geneData);
    const actual = await fs.readFile(outfile, 'utf8');
    expect(JSON.parse(actual)).toEqual(expected);
  });
});
