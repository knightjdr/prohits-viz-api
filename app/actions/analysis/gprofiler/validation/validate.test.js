const { defaultGprofilerSettings } = require('./default-settings');
const validateGprofiler = require('./validate');

describe('Validate Gprofiler fetch options', () => {
  it('should validate acceptable parameters', () => {
    const settings = {
      all_results: true,
      domain_scope: 'known',
      measure_underrepresentation: true,
      no_evidences: true,
      no_iea: true,
      numeric_ns: 'DBASS3',
      ordered: true,
      organism: 'mmusculus',
      query: ['a', 'b', 'c'],
      significance_threshold_method: 'fdr',
      user_threshold: 0.05,
    };
    const sources = {
      CORUM: true,
      GO: true,
      'GO:BP': true,
      'GO:CC': true,
      'GO:MF': true,
      HP: false,
      HPA: false,
      KEGG: false,
      MIRNA: false,
      REAC: true,
      TF: true,
      WP: true,
    };
    const body = {
      ...settings,
      ...sources,
    };
    const expected = {
      ...settings,
      sources: ['CORUM', 'GO:BP', 'GO:CC', 'GO:MF', 'REAC', 'TF', 'WP'],
    };
    expect(validateGprofiler(body)).toEqual(expected);
  });

  it('should validate and parse background with "custom" domain_scope', () => {
    const settings = {
      background: 'a, b  c\nd\t e',
      domain_scope: 'custom',
      query: ['a', 'b', 'c'],
    };
    const body = {
      ...settings,
    };
    const expected = {
      ...defaultGprofilerSettings,
      ...settings,
      background: ['a', 'b', 'c', 'd', 'e'],
      domain_scope: 'custom',
    };
    expect(validateGprofiler(body)).toEqual(expected);
  });

  it('should handle missing values', () => {
    const body = {};
    const expected = {
      ...defaultGprofilerSettings,
    };
    expect(validateGprofiler(body)).toEqual(expected);
  });

  it('should handle incorrect values', () => {
    const body = {
      all_results: 'true',
      domain_scope: true,
      measure_underrepresentation: 'true',
      no_evidences: 'true',
      no_iea: 'true',
      numeric_ns: 'AAAAAA',
      ordered: 'true',
      organism: 4,
      query: {},
      significance_threshold_method: 4,
      user_threshold: '0.05',
    };
    const expected = defaultGprofilerSettings;
    expect(validateGprofiler(body)).toEqual(expected);
  });
});
