import mockFS from 'mock-fs';

import parseUniprot from './parse-uniprot.js';

const createTabs = () => '\t'.repeat(14);

const uniprotTab = `UniProtKB-AC\tUniProtKB-ID\tGeneID (EntrezGene)\tRefSeq${createTabs()}Ensembl\t\tEnsembl_PRO
P11111\tA_HUMAN\t111\tNP_100000.1; NP_110000\t${createTabs()}ENSG00000000001\t\tENSP00000000001; ENSP00000000011
P22222\tB_HUMAN\t222\tNP_200000.1\t${createTabs()}ENSG00000000002; ENSG00000000022\t\tENSP00000000002
P11112\tAA_HUMAN\t111\t\t${createTabs()}ENSG00000000111\t\tENSP00000000111
`;

const mockedFileSystem = {
  'uniprot.tab': uniprotTab,
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Parse uniprot gene map', () => {
  it('should parse data by Entrez ID from file', async () => {
    const expected = {
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

    return expect(parseUniprot('./uniprot.tab')).resolves.toEqual(expected);
  });
});
