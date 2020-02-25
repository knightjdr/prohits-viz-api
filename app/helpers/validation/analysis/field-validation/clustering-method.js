const validMethods = ['average', 'centroid', 'complete', 'mcquitty', 'median', 'single', 'ward'];

const validateClusteringMethod = (value) => {
  if (validMethods.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

export default validateClusteringMethod;
