const validMetrics = ['binary', 'canberra', 'euclidean', 'jaccard', 'Manhattan', 'maximum'];

const validateClusteringMetric = value => (
  validMetrics.includes(value)
);

export default validateClusteringMetric;
