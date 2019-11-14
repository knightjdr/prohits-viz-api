const parseResults = require('./parse-results');

describe('Parse g:Profiler results', () => {
  it('should return an array mapping results to object with correct fields', () => {
    const genes = ['a', 'b', 'c'];
    const results = [
      {
        intersection_size: 23,
        intersections: [[], ['IEA'], []],
        name: 'cytoplasm',
        native: 'GO:0005737',
        p_value: 0.001,
        query_size: 23,
        source: 'GO:CC',
        term_size: 11620,
      },
      {
        intersection_size: 22,
        intersections: [['IEA'], [], ['IEA']],
        name: 'nucleus',
        native: 'GO:0005736',
        p_value: 0.002,
        query_size: 24,
        source: 'GO:CC',
        term_size: 1000,
      },
    ];
    const expected = [
      {
        id: 'GO:0005737',
        intersectionSize: 23,
        genes: ['b'],
        querySize: 23,
        pValue: 0.001,
        source: 'GO:CC',
        term: 'cytoplasm',
        termSize: 11620,
      },
      {
        id: 'GO:0005736',
        intersectionSize: 22,
        genes: ['a', 'c'],
        querySize: 24,
        pValue: 0.002,
        source: 'GO:CC',
        term: 'nucleus',
        termSize: 1000,
      },
    ];
    expect(parseResults(results, genes)).toEqual(expected);
  });
});
