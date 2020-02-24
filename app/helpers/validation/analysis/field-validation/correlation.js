const acceptedAlgorithms = ['kendall', 'pearson', 'spearman'];

const validateCorrelation = value => (
  acceptedAlgorithms.includes(value)
);

export default validateCorrelation;
