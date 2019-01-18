const mockFS = require('mock-fs');
const fs = require('fs');

const parseTissues = require('./parse-tissues');

const infile = `1\t2\t3\t4\t5
x\tA\tcellA\t20\t
x\tB\tcellB\t40\t`;
const expected = `A\tcellA\t20
B\tcellB\t40\n`;

const mockedFileSystem = {
  'tissue.txt': infile,
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Parse tissues', () => {
  let species;

  beforeAll(async (done) => {
    species = await parseTissues('./tissue.txt', './parsed.txt', 'w');
    done();
  });

  it('should parse tissue file', () => {
    const data = fs.readFileSync('./parsed.txt', 'utf8');
    expect(data).toEqual(expected);
  });

  it('should return a list of cells', () => {
    expect(species).toEqual({ cellA: 1, cellB: 1 });
  });
});
