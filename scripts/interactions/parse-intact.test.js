/* eslint-disable max-len */
import mockFS from 'mock-fs';

import parseIntact from './parse-intact.js';

const createTabs = n => '\t'.repeat(n);

const infile = `${createTabs(9)}Taxid interactor A\tTaxid interactor C${createTabs(12)}\tXref(s) interactor A\tXref(s) interactor B
${createTabs(9)}taxid:9606\ttaxid:9606${createTabs(12)}refseq:NP_XXXXX|entrezgene/locuslink:111\trefseq:NP_XXXXX|entrezgene/locuslink:222
${createTabs(9)}taxid:9606\ttaxid:9606${createTabs(12)}refseq:NP_XXXXX|entrezgene/locuslink:333\trefseq:NP_XXXXX|entrezgene/locuslink:444
${createTabs(9)}taxid:9606\ttaxid:1000${createTabs(12)}refseq:NP_XXXXX|entrezgene/locuslink:111\trefseq:NP_XXXXX|entrezgene/locuslink:444
${createTabs(9)}taxid:1000\ttaxid:9606${createTabs(12)}refseq:NP_XXXXX|entrezgene/locuslink:222\trefseq:NP_XXXXX|entrezgene/locuslink:444
${createTabs(9)}taxid:9606\ttaxid:9606${createTabs(12)}refseq:NP_XXXXX|entrezgene/locuslink:111\trefseq:NP_XXXXX|entrezgene/locuslink:333\n`;

const mockedFileSystem = {
  'intactFile.txt': infile,
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Parse Intact', () => {
  it('should parse biogrid file', async () => {
    const interactions = await parseIntact('./intactFile.txt');

    const expected = {
      111: { 222: 1, 333: 1 },
      222: { 111: 1 },
      333: { 111: 1, 444: 1 },
      444: { 333: 1 },
    };
    expect(interactions).toEqual(expected);
  });
});
