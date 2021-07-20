import mockFS from 'mock-fs';

import parseDomains from './parse-domains.js';

const infile = `#Pfam-A regions from Pfam version 34.0 for ncbi taxid 9606 'Homo sapiens (Human)'
#Total number of proteins in proteome: 75768
#<seq id>\t<alignment start>\t<alignment end>\t<envelope start>\t<envelope end>\t<hmm acc>\t<hmm name>
P00505\t58\t425\t57\t425\tPF00155\tAminotran_1_2\tDomain\t2\t363\t363\t324.3\t3.2e-93\tCL0061
P00519\t127\t202\t127\t202\tPF00017\tSH2\tDomain\t1\t77\t77\t81.9\t8.2e-20\tCL0541
P00519\t67\t113\t67\t113\tPF00018\tSH3_1\tDomain\t1\t48\t48\t46.3\t7.6e-09\tCL0010
P00519\t1026\t1130\t1025\t1130\tPF08919\tF_actin_bind\tDomain\t2\t110\t110\t97.3\t1.8e-24\tNo_clan
P00519\t242\t492\t242\t493\tPF07714\tPK_Tyr_Ser-Thr\tDomain\t1\t258\t259\t332\t6.7e-96\tCL0016
P00533\t185\t338\t177\t338\tPF00757\tFurin-like\tDomain\t10\t149\t149\t101.3\t1.4e-25\tCL0547
P00533\t57\t167\t57\t168\tPF01030\tRecep_L_domain\tRepeat\t1\t109\t110\t107.3\t1.3e-27\tCL0022
P00533\t361\t480\t361\t481\tPF01030\tRecep_L_domain\tRepeat\t1\t109\t110\t95.2\t7.7e-24\tCL0022
P00533\t505\t636\t505\t637\tPF14843\tGF_recep_IV\tDomain\t1\t131\t132\t157.2\t5.5e-43\tCL0547
P00533\t713\t965\t712\t968\tPF07714\tPK_Tyr_Ser-Thr\tDomain\t2\t256\t259\t294.1\t2.6e-84\tCL0016
`;

const mockedFileSystem = {
  'domains.txt': infile,
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Parse Pfam domains', () => {
  it('should parse domains by Uniprot Accession', async () => {
    const domains = await parseDomains('domains.txt');

    const expected = {
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
    expect(domains).toEqual(expected);
  });
});
