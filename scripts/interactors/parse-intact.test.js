const mockFS = require('mock-fs');
const fs = require('fs');

const parseIntact = require('./parse-intact');

const infile = `1\t2\t3\t4\t5\t6\t7\t8\t9\t10\t11\t12\t13\t14\t15\t16\t17
x\tx\tx\tx\tuniprotkb:A(gene name)\tuniprotkb:B(gene name)\tx\tx\tx\ttaxid:9606\ttaxid:9606
x\tx\tx\tx\tuniprotkb:C(gene name)\tuniprotkb:D(gene name)\tx\tx\tx\ttaxid:9606\ttaxid:9606
x\tx\tx\tx\tuniprotkb:X(gene name)\t\tx\tx\tx\ttaxid:9606\ttaxid:9606
x\tx\tx\tx\tuniprotkb:Y(gene name)\tuniprotkb:Z(gene name)\tx\tx\tx\t\ttaxid:9606\n`;
const expected = `A\tB\tHomo sapiens\tHomo sapiens
C\tD\tHomo sapiens\tHomo sapiens\n`;
const taxon = {
  9606: 'Homo sapiens',
  10000: 'Misc species',
};

const mockedFileSystem = {
  'intactFile.txt': infile,
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Parse Intact', () => {
  let species;

  beforeAll(async (done) => {
    species = await parseIntact(taxon, './intactFile.txt', './parsed.txt');
    done();
  });

  it('should parse intact file', () => {
    const data = fs.readFileSync('./parsed.txt', 'utf8');
    expect(data).toEqual(expected);
  });

  it('should return a list of species', () => {
    expect(species).toEqual({ 'Homo sapiens': 1 });
  });
});
