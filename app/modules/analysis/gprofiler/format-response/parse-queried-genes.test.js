const parseQueriedGenes = require('./parse-queried-genes');

describe('Parse gene names queried at g:Profiler', () => {
  it('should return an array of genes in the query order', () => {
    const genesMetadata = {
      query: {
        query_1: {
          ensgs: [1, 2, 4],
          mapping: {
            a: 2,
            b: 1,
            c: 4,
          },
        },
      },
    };
    const expected = ['b', 'a', 'c'];
    expect(parseQueriedGenes(genesMetadata)).toEqual(expected);
  });
});
