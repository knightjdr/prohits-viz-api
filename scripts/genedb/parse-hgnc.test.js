import mockFS from 'mock-fs';

import parseHgnc from './parse-hgnc.js';

const hgncJSON = {
  response: {
    docs: [
      {
        symbol: 'a',
        entrez_id: '111',
        ensembl_gene_id: ['ENSG00000000001'],
        refseq_accession: ['NR_100000', 'NM_100000.1'],
        uniprot_ids: ['P11111'],
        prev_symbol: ['A'],
        alias_symbol: ['ax'],
      },
      {
        symbol: 'c',
        entrez_id: '333',
        ensembl_gene_id: ['ENSG00000000003'],
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

    return expect(parseHgnc('./hgnc.json')).resolves.toEqual(expected);
  });
});
