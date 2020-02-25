const acceptedAlgorithms = ['kendall', 'pearson', 'spearman'];

const validateCorrelation = (value) => {
  if (acceptedAlgorithms.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

export default validateCorrelation;
