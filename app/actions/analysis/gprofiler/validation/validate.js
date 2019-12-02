const addBackground = require('./add-background');
const addSources = require('./add-sources');
const { accepted, defaultGprofilerSettings } = require('./default-settings');

const validate = require('../../../../utils/validate-type');

const validateAgainstArray = (value, arr, defaultValue) => (
  arr.includes(value) ? value : defaultValue
);

const validateGprofiler = (body) => {
  const options = {
    all_results: validate.validateBoolean(body.all_results, defaultGprofilerSettings.all_results),
    domain_scope: validateAgainstArray(
      body.domain_scope,
      accepted.domainScope,
      defaultGprofilerSettings.domain_scope,
    ),
    measure_underrepresentation: validate.validateBoolean(
      body.measure_underrepresentation,
      defaultGprofilerSettings.measure_underrepresentation,
    ),
    no_evidences: validate.validateBoolean(
      body.no_evidences,
      defaultGprofilerSettings.no_evidences,
    ),
    no_iea: validate.validateBoolean(body.no_iea, defaultGprofilerSettings.no_iea),
    numeric_ns: validateAgainstArray(body.numeric_ns, accepted.numberNS, 'ENTREZGENE'),
    ordered: validate.validateBoolean(body.ordered, defaultGprofilerSettings.ordered),
    organism: validate.validateString(body.organism, defaultGprofilerSettings.organism),
    query: validate.validateArray(body.query, defaultGprofilerSettings.query),
    significance_threshold_method: validateAgainstArray(
      body.significance_threshold_method,
      accepted.significanceAlgorithm,
      'g_SCS',
    ),
    sources: addSources(defaultGprofilerSettings.sources, body),
    user_threshold: validate.validateNumber(
      body.user_threshold,
      defaultGprofilerSettings.user_threshold,
    ),
  };

  return {
    ...options,
    ...addBackground(options.domain_scope, body, defaultGprofilerSettings.domain_scope),
  };
};

module.exports = validateGprofiler;
