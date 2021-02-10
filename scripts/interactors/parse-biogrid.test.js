import mockFS from 'mock-fs';

import parseBiogrid from './parse-biogrid.js';

const createTabs = () => '\t'.repeat(33);

const infile = `interaction ID\tentrez ID A\tentrez IDB${createTabs()}species A\tspecies B
1\t111\t222${createTabs()}9606\t9606
2\t333\t444${createTabs()}9606\t9606
2\t111\t444${createTabs()}9606\t1000
2\t222\t444${createTabs()}1000\t9606
2\t111\t333${createTabs()}9606\t9606\n`;

const mockedFileSystem = {
  'biogridFile.txt': infile,
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Parse biogrid', () => {
  it('should parse biogrid file', async () => {
    const interactions = await parseBiogrid('./biogridFile.txt');

    const expected = {
      111: { 222: 1, 333: 1 },
      222: { 111: 1 },
      333: { 111: 1, 444: 1 },
      444: { 333: 1 },
    };
    expect(interactions).toEqual(expected);
  });
});
