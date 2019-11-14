const formatResponse = require('./format-response');

describe('Format response from g:Profiler', () => {
  it('should parse and format results', () => {
    const response = {
      data: {
        meta: {
          genes_metadata: {
            failed: ['d'],
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
          },
        },
        result: [
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
        ],
      },
    };
    const expected = {
      results: [
        {
          id: 'GO:0005737',
          intersectionSize: 23,
          genes: ['a'],
          querySize: 23,
          pValue: 0.001,
          source: 'GO:CC',
          term: 'cytoplasm',
          termSize: 11620,
        },
      ],
      unknownQueries: ['d'],
    };
    expect(formatResponse(response)).toEqual(expected);
  });
});
