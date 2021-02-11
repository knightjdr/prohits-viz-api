import fs from 'fs/promises';
import mockFS from 'mock-fs';

import writeData from './write-data.js';

const mockedFileSystem = {
  files: {},
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Write gene db data script', () => {
  it('should write data to file', async () => {
    const hgnc = {
      111: {
        ensemblg: ['ENSG00000000001'],
        refseqg: ['NR_100000', 'NM_100000.1'],
        symbol: ['a', 'ax', 'A'],
        uniprotacc: ['P11111'],
      },
      333: {
        ensemblg: ['ENSG00000000003'],
        refseqg: ['NM_300000'],
        symbol: ['c'],
        uniprotacc: ['P33333'],
      },
    };
    const uniprot = {
      111: {
        ensemblg: ['ENSG00000000001', 'ENSG00000000111'],
        ensemblp: ['ENSP00000000001', 'ENSP00000000011', 'ENSP00000000111'],
        refseqp: ['NP_100000.1', 'NP_110000'],
        uniprotacc: ['P11111', 'P11112'],
        uniprotid: ['A_HUMAN', 'AA_HUMAN'],
      },
      222: {
        ensemblg: ['ENSG00000000002', 'ENSG00000000022'],
        ensemblp: ['ENSP00000000002'],
        refseqp: ['NP_200000.1'],
        uniprotacc: ['P22222'],
        uniprotid: ['B_HUMAN'],
      },
    };

    const expected = {
      111: {
        ensemblg: ['ENSG00000000001', 'ENSG00000000111'],
        ensemblp: ['ENSP00000000001', 'ENSP00000000011', 'ENSP00000000111'],
        refseqg: ['NM_100000'],
        refseqp: ['NP_100000', 'NP_110000'],
        symbol: ['a', 'ax', 'A'],
        uniprotacc: ['P11111', 'P11112'],
        uniprotid: ['A_HUMAN', 'AA_HUMAN'],
      },
      222: {
        ensemblg: ['ENSG00000000002', 'ENSG00000000022'],
        ensemblp: ['ENSP00000000002'],
        refseqg: [],
        refseqp: ['NP_200000'],
        symbol: [],
        uniprotacc: ['P22222'],
        uniprotid: ['B_HUMAN'],
      },
      333: {
        ensemblg: ['ENSG00000000003'],
        ensemblp: [],
        refseqg: ['NM_300000'],
        refseqp: [],
        symbol: ['c'],
        uniprotacc: ['P33333'],
        uniprotid: [],
      },
    };

    await writeData({ hgnc, uniprot }, './files/gene-db.json');
    const actual = await fs.readFile('files/gene-db.json', 'utf8');
    expect(JSON.parse(actual)).toEqual(expected);
  });
});
