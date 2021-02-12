import fs from 'fs/promises';
import mockFS from 'mock-fs';

import writeData from './write-gene-data.js';

const mockedFileSystem = {
  files: {},
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Write gene db', () => {
  it('should write data to file', async () => {
    const hgnc = {
      1: {
        aliasSymbol: ['ax'],
        ensemblg: 'ENSG00000000001',
        entrez: '111',
        prevSymbol: ['A'],
        refseqg: ['NR_100000', 'NM_100000.1'],
        symbol: 'a',
        uniprotacc: ['P11111'],
      },
      3: {
        aliasSymbol: [],
        ensemblg: 'ENSG00000000003',
        entrez: '333',
        prevSymbol: [],
        refseqg: ['NM_300000'],
        symbol: 'c',
        uniprotacc: ['P33333'],
      },
    };
    const uniprot = {
      P11111: {
        ensemblp: ['ENSP00000000001', 'ENSP00000000011'],
        refseqp: ['NP_100000.1', 'NP_110000'],
        uniprotid: 'A_HUMAN',
      },
      P33333: {
        ensemblp: [],
        refseqp: ['NP_300000.1'],
        uniprotid: 'C_HUMAN',
      },
    };
    const outfile = './files/gene-db.json';

    const expected = {
      1: {
        aliasSymbol: ['ax'],
        ensemblg: 'ENSG00000000001',
        ensemblp: ['ENSP00000000001', 'ENSP00000000011'],
        entrez: '111',
        prevSymbol: ['A'],
        refseqg: ['NM_100000'],
        refseqp: ['NP_100000', 'NP_110000'],
        symbol: 'a',
        uniprotacc: ['P11111'],
        uniprotid: ['A_HUMAN'],
      },
      3: {
        aliasSymbol: [],
        ensemblg: 'ENSG00000000003',
        ensemblp: [],
        entrez: '333',
        prevSymbol: [],
        refseqg: ['NM_300000'],
        refseqp: ['NP_300000'],
        symbol: 'c',
        uniprotacc: ['P33333'],
        uniprotid: ['C_HUMAN'],
      },
    };

    await writeData({ hgnc, uniprot }, outfile);
    const actual = await fs.readFile(outfile, 'utf8');
    expect(JSON.parse(actual)).toEqual(expected);
  });
});
