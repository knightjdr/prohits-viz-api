const { defaultGoSettings, validateGo } = require('./validate');

describe('Validate go method object', () => {
  it('with valid falsy parameters', () => {
    const body = {
      domain_size_type: 'known',
      hierfiltering: 'compact_ccomp',
      max_set_size: 100,
      min_isect_size: 5,
      min_set_size: 5,
      no_iea: false,
      ordered_query: false,
      organism: 'mmusculus',
      query: '',
      region_query: false,
      sf_CORUM: false,
      sf_GO: false,
      sf_HP: false,
      sf_KEGG: false,
      sf_MI: false,
      sf_REAC: false,
      sf_TF: false,
      'sf_GO:BP': false,
      'sf_GO:CC': false,
      'sf_GO:MF': false,
      significant: false,
      sort_by_structure: false,
      threshold_algo: 'fdr',
      underrep: false,
      user_thr: 0.5,
    };
    const expected = {
      domain_size_type: 'known',
      hierfiltering: 'compact_ccomp',
      max_set_size: 100,
      min_isect_size: 5,
      min_set_size: 5,
      no_iea: 0,
      ordered_query: 0,
      organism: 'mmusculus',
      output: 'mini',
      query: '',
      region_query: 0,
      significant: 0,
      sort_by_structure: 0,
      threshold_algo: 'fdr',
      underrep: 0,
      user_thr: 0.5,
    };
    expect(validateGo(body)).toEqual(expected);
  });

  it('with valid truthy parameters', () => {
    const body = {
      domain_size_type: 'known',
      hierfiltering: 'compact_ccomp',
      max_set_size: 100,
      min_isect_size: 5,
      min_set_size: 5,
      no_iea: true,
      ordered_query: true,
      organism: 'mmusculus',
      query: '',
      region_query: true,
      sf_CORUM: true,
      sf_GO: true,
      sf_HP: true,
      sf_KEGG: true,
      sf_MI: true,
      sf_REAC: true,
      sf_TF: true,
      'sf_GO:BP': true,
      'sf_GO:CC': true,
      'sf_GO:MF': true,
      significant: true,
      sort_by_structure: true,
      threshold_algo: 'fdr',
      underrep: true,
      user_thr: 0.5,
    };
    const expected = {
      domain_size_type: 'known',
      hierfiltering: 'compact_ccomp',
      max_set_size: 100,
      min_isect_size: 5,
      min_set_size: 5,
      no_iea: 1,
      ordered_query: 1,
      organism: 'mmusculus',
      output: 'mini',
      query: '',
      region_query: 1,
      sf_CORUM: 1,
      sf_GO: 1,
      sf_HP: 1,
      sf_KEGG: 1,
      sf_MI: 1,
      sf_REAC: 1,
      sf_TF: 1,
      'sf_GO:BP': 1,
      'sf_GO:CC': 1,
      'sf_GO:MF': 1,
      significant: 1,
      sort_by_structure: 1,
      threshold_algo: 'fdr',
      underrep: 1,
      user_thr: 0.5,
    };
    expect(validateGo(body)).toEqual(expected);
  });

  it('with missing parameters', () => {
    const body = {
      query: '',
    };
    const expected = {
      ...defaultGoSettings,
      query: '',
      no_iea: 0,
      ordered_query: 0,
      region_query: 0,
      significant: 0,
      sort_by_structure: 0,
      underrep: 0,
    };
    expect(validateGo(body)).toEqual(expected);
  });

  it('with invalid parameters', () => {
    const body = {
      advanced_options_on: 'a',
      domain_size_type: 'other',
      hierfiltering: 'something',
      max_set_size: 'a',
      min_isect_size: 'a',
      min_set_size: 'a',
      no_iea: 10,
      ordered_query: 10,
      query: '',
      region_query: 'a',
      sf_CORUM: 'a',
      sf_GO: 10,
      sf_HP: 10,
      sf_KEGG: 'a',
      sf_MI: 'a',
      sf_REAC: 10,
      sf_TF: 10,
      'sf_GO:BP': 'a',
      'sf_GO:CC': 'a',
      'sf_GO:MF': 10,
      significant: 10,
      sort_by_structure: 'a',
      threshold_algo: 'other',
      underrep: 10,
      user_thr: 'a',
    };
    const expected = {
      ...defaultGoSettings,
      query: '',
      no_iea: 1,
      ordered_query: 1,
      region_query: 1,
      sf_CORUM: 1,
      sf_GO: 1,
      sf_HP: 1,
      sf_KEGG: 1,
      sf_MI: 1,
      sf_REAC: 1,
      sf_TF: 1,
      'sf_GO:BP': 1,
      'sf_GO:CC': 1,
      'sf_GO:MF': 1,
      significant: 1,
      sort_by_structure: 1,
      underrep: 1,
    };
    expect(validateGo(body)).toEqual(expected);
  });
});
