const validMetrics = ['binary', 'canberra', 'euclidean', 'jaccard', 'Manhattan', 'maximum'];

const validateClusteringMetric = (value) => {
  if (validMetrics.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

export default validateClusteringMetric;
