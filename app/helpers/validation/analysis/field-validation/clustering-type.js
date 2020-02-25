const validType = ['none', 'biclustering', 'hierarchical'];

export const validateConditionClustering = (value) => {
  if (value === '' || ['none', 'conditions'].includes(value)) {
    return [true, value];
  }

  return [false, null];
};

export const validateReadoutClustering = (value) => {
  if (value === '' || ['none', 'readouts'].includes(value)) {
    return [true, value];
  }

  return [false, null];
};

const validateClusteringType = (value) => {
  if (validType.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

export default validateClusteringType;
