const mockFS = require('mock-fs');
const fs = require('fs');

const parseBiogrid = require('./parse-biogrid');

const infile = `1\t2\t3\t4\t5\t6\t7\t8\t9\t10\t11\t12\t13\t14\t15\t16\t17
x\tx\tx\tx\tx\tx\tx\tA\tB\tx\tx\tx\tx\tx\tx\t9606\t9606
x\tx\tx\tx\tx\tx\tx\tC\tD\tx\tx\tx\tx\tx\tx\t9606\t9606\n`;
const expected = `A\tB\tHomo sapiens\tHomo sapiens
C\tD\tHomo sapiens\tHomo sapiens\n`;
const taxon = {
  9606: 'Homo sapiens',
  10000: 'Misc species',
};


const mockedFileSystem = {
  'biogridFile.txt': infile,
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Parse biogrid', () => {
  let species;

  beforeAll(async (done) => {
    species = await parseBiogrid(taxon, './biogridFile.txt', './parsed.txt');
    done();
  });

  it('should parse biogrid file', () => {
    const data = fs.readFileSync('./parsed.txt', 'utf8');
    expect(data).toEqual(expected);
  });

  it('should return a list of species', () => {
    expect(species).toEqual({ 'Homo sapiens': 1 });
  });
});
