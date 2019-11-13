const criteria = require('../../helpers/validate-criteria');
const defaultSettings = require('./default-settings');
const parseBackground = require('./parse-background');

const acceptedDomainScope = ['annotated', 'custom', 'known'];
const acceptedNumberNS = [
  'AFFY_HUEX_1_0_ST_V2',
  'AFFY_HUGENE_1_0_ST_V1',
  'AFFY_HUGENE_2_0_ST_V1',
  'DBASS3',
  'DBASS5',
  'ENTREZGENE',
  'ILLUMINA_HUMANWG_6_V1',
  'MIM_GENE',
  'MIM_MORBID',
  'WIKIGENE',
];
const acceptedSigAlgo = ['bonferroni', 'fdr', 'g_SCS'];

const addSources = (defaultSources, body) => (
  defaultSources.reduce((accum, source) => (body[source] ? [...accum, source] : accum), [])
);

const validateAgainstArray = (value, arr, defaultValue) => (
  arr.includes(value) ? value : defaultValue
);

const validateGprofiler = (body) => {
  const options = {
    all_results: criteria.isBoolean(body.all_results, defaultSettings.all_results),
    domain_scope: validateAgainstArray(body.domain_scope, acceptedDomainScope, 'known'),
    measure_underrepresentation: criteria.isBoolean(
      body.measure_underrepresentation,
      defaultSettings.measure_underrepresentation,
    ),
    no_evidences: criteria.isBoolean(body.no_evidences, defaultSettings.no_evidences),
    no_iea: criteria.isBoolean(body.no_iea, defaultSettings.no_iea),
    numeric_ns: validateAgainstArray(body.numeric_ns, acceptedNumberNS, 'ENTREZGENE'),
    ordered: criteria.isBoolean(body.ordered, defaultSettings.ordered),
    organism: body.organism,
    query: body.query,
    significance_threshold_method: validateAgainstArray(body.significance_threshold_method, acceptedSigAlgo, 'g_SCS'),
    sources: addSources(defaultSettings.sources, body),
    user_threshold: criteria.isNumber(body.user_threshold, defaultSettings.user_threshold),
  };

  if (options.domain_scope === 'custom') {
    const background = parseBackground(body.background);
    if (background.length === 0) {
      options.background = background;
    } else {
      options.domain_scope = 'known';
    }
  }

  return options;
};

module.exports = validateGprofiler;
