const defaultGprofilerSettings = {
  all_results: false,
  domain_scope: 'annotated',
  measure_underrepresentation: false,
  no_evidences: false,
  no_iea: false,
  numeric_ns: 'ENTREZGENE',
  ordered: false,
  organism: 'hsapiens',
  significance_threshold_method: 'g_SCS',
  sources: [
    'CORUM',
    'GO',
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

module.exports = defaultGprofilerSettings;
