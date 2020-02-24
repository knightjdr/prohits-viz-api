const validType = ['none', 'biclustering', 'hierarchical'];

export const validateConditionClustering = value => (
  ['none', 'conditions'].includes(value)
);

export const validateReadoutClustering = value => (
  ['none', 'readouts'].includes(value)
);

const validateClusteringType = value => (
  validType.includes(value)
);

export default validateClusteringType;
