const mapFieldsToResult = require('./map-fields-to-result');

describe('Map g:Profiler result to fields for frontend', () => {
  it('should map api fields to desired properties', () => {
    const result = {
      goshv: 43376,
      p_value: 0.0030559397731264606,
      significant: true,
      effective_domain_size: 18842,
      intersection_size: 23,
      term_size: 11620,
      query_size: 23,
      precision: 1,
      recall: 0.0019793459552495695,
      description: '"All of the contents of a cell excluding the plasma membrane and nucleus',
      name: 'cytoplasm',
      native: 'GO:0005737',
      source: 'GO:CC',
      query: 'query_1',
      source_order: 402,
      group_id: 5,
    };
    const expected = {
      id: 'GO:0005737',
      intersectionSize: 23,
      querySize: 23,
      pValue: 0.0030559397731264606,
      source: 'GO:CC',
      term: 'cytoplasm',
      termSize: 11620,
    };
    expect(mapFieldsToResult(result)).toEqual(expected);
  });
});
