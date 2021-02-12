import mockFS from 'mock-fs';

import parseHgnc from './parse-hgnc.js';

const hgncJSON = {
  response: {
    docs: [
      {
        hgnc_id: 'HGNC:1',
        symbol: 'a',
        entrez_id: '111',
        ensembl_gene_id: 'ENSG00000000001',
        refseq_accession: ['NR_100000', 'NM_100000.1'],
        uniprot_ids: ['P11111'],
        prev_symbol: ['A'],
        alias_symbol: ['ax'],
      },
      {
        hgnc_id: 'HGNC:3',
        symbol: 'c',
        entrez_id: '333',
        ensembl_gene_id: 'ENSG00000000003',
        refseq_accession: ['NM_300000'],
        uniprot_ids: ['P33333'],
      },
    ],
  },
};

const mockedFileSystem = {
  'hgnc.json': JSON.stringify(hgncJSON),
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Parse hgnc gene map', () => {
  it('should parse data by Entrez ID from file', async () => {
    const expected = {
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

    return expect(parseHgnc('./hgnc.json')).resolves.toEqual(expected);
  });
});
