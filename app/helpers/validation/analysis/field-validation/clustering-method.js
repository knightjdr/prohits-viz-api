const validMethods = ['average', 'centroid', 'complete', 'mcquitty', 'median', 'single', 'ward'];

const validateClusteringMethod = value => (
  validMethods.includes(value)
);

export default validateClusteringMethod;
