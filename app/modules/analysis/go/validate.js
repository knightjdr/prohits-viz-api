/* eslint camelcase: "off" */

const criteria = require('../../helpers/validate-criteria');

const acceptedDomainType = ['annotated', 'known'];
const acceptedFiltering = ['compact_ccomp', 'compact_rgroups'];
const acceptedMaxSet = [0, 50, 100, 350, 500, 1000, 1500, 2000, 3500, 5000];
const acceptedMinIsect = [0, 2, 3, 5, 10];
const acceptedMinSet = [0, 2, 3, 5, 10, 25, 50];
const acceptedThresAlgo = ['analytical', 'bonferroni', 'fdr'];

const defaultGoSettings = {
  domain_size_type: 'annotated',
  organism: 'hsapiens',
  output: 'mini',
  threshold_algo: 'analytical',
};

/* Validation checks parameters except for output, which is always "mini". Also,
** doesn't validate query value - assumes it is a valid string. */
const validateGo = (body) => {
  const {
    domain_size_type,
    hierfiltering,
    max_set_size,
    min_isect_size,
    min_set_size,
    no_iea,
    ordered_query,
    organism,
    query,
    region_query,
    sf_CORUM,
    sf_GO,
    sf_HP,
    sf_KEGG,
    sf_MI,
    sf_REAC,
    sf_TF,
    'sf_GO:BP': sf_GP_BP,
    'sf_GO:CC': sf_GP_CC,
    'sf_GO:MF': sf_GP_MF,
    significant,
    sort_by_structure,
    threshold_algo,
    underrep,
    user_thr,
  } = body;

  const params = {
    output: defaultGoSettings.output,
    query,
  };

  // Mandatory fields.
  params.domain_size_type = domain_size_type && acceptedDomainType.includes(domain_size_type) ?
    domain_size_type : defaultGoSettings.domain_size_type;
  params.threshold_algo = threshold_algo && acceptedThresAlgo.includes(threshold_algo) ?
    threshold_algo : defaultGoSettings.threshold_algo;
  params.organism = criteria.isString(organism, defaultGoSettings.organism);

  // Optional fields.
  if (hierfiltering && acceptedFiltering.includes(hierfiltering)) {
    params.hierfiltering = hierfiltering;
  }
  if (acceptedMaxSet.includes(max_set_size)) {
    params.max_set_size = max_set_size;
  }
  if (acceptedMinIsect.includes(min_isect_size)) {
    params.min_isect_size = min_isect_size;
  }
  if (acceptedMinSet.includes(min_set_size)) {
    params.min_set_size = min_set_size;
  }
  if (criteria.isNumber(user_thr, defaultGoSettings.user_thr)) {
    params.user_thr = user_thr;
  }
  if (sf_CORUM) {
    params.sf_CORUM = 1;
  }
  if (sf_GO) {
    params.sf_GO = 1;
  }
  if (sf_HP) {
    params.sf_HP = 1;
  }
  if (sf_KEGG) {
    params.sf_KEGG = 1;
  }
  if (sf_MI) {
    params.sf_MI = 1;
  }
  if (sf_REAC) {
    params.sf_REAC = 1;
  }
  if (sf_TF) {
    params.sf_TF = 1;
  }
  if (sf_GP_BP) {
    params['sf_GO:BP'] = 1;
  }
  if (sf_GP_CC) {
    params['sf_GO:CC'] = 1;
  }
  if (sf_GP_MF) {
    params['sf_GO:MF'] = 1;
  }

  // Boolean fields.
  params.no_iea = no_iea ? 1 : 0;
  params.ordered_query = ordered_query ? 1 : 0;
  params.region_query = region_query ? 1 : 0;
  params.significant = significant ? 1 : 0;
  params.sort_by_structure = sort_by_structure ? 1 : 0;
  params.underrep = underrep ? 1 : 0;

  return params;
};

module.exports = {
  defaultGoSettings,
  validateGo,
};
