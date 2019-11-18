const parseResults = require('./parse-results');

describe('Parse g:Profiler results', () => {
  it('should return an array mapping results to object with correct fields', () => {
    const genes = ['c', 'b', 'a'];
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
        native: 'CORUM:6403',
        p_value: 2.4592323e-8,
        query_size: 24,
        source: 'CORUM',
        term_size: 1000,
      },
    ];
    const expected = [
      {
        id: 'GO:0005737',
        intersectionSize: 23,
        genes: 'b',
        querySize: 23,
        pValue: '1.000e-3',
        source: 'GO:CC',
        sourceURL: 'http://amigo.geneontology.org/amigo/term/GO:0005737',
        term: 'cytoplasm',
        termSize: 11620,
      },
      {
        id: 'CORUM:6403',
        intersectionSize: 22,
        genes: 'a, c',
        querySize: 24,
        pValue: '2.459e-8',
        source: 'CORUM',
        sourceURL: '',
        term: 'nucleus',
        termSize: 1000,
      },
    ];
    expect(parseResults(results, genes)).toEqual(expected);
  });
});
