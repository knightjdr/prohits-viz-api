const accepted = {
  domainScope: ['annotated', 'custom', 'known'],
  numberNS: [
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
  ],
  significanceAlgorithm: ['bonferroni', 'fdr', 'g_SCS'],
};

const defaultGprofilerSettings = {
  all_results: false,
  domain_scope: 'annotated',
  measure_underrepresentation: false,
  no_evidences: false,
  no_iea: false,
  numeric_ns: 'ENTREZGENE',
  ordered: false,
  organism: 'hsapiens',
  query: [],
  significance_threshold_method: 'g_SCS',
  sources: [
    'CORUM',
    'GO:BP',
    'GO:CC',
    'GO:MF',
    'HP',
    'HPA',
    'KEGG',
    'MIRNA',
    'REAC',
    'TF',
    'WP',
  ],
  user_threshold: 0.01,
};

module.exports = {
  accepted,
  defaultGprofilerSettings,
};
