import isObject from '../../../utils/is-object.js';

const validTypes = ['dotplot', 'heatmap', 'circheatmap', 'scatter'];

const validateFileParameters = (parameters) => {
  if (
    !parameters ||
    !isObject(parameters)
  ) {
    throw new Error('The JSON object must have a "parameters" property with an object containing analysis parameters');
  }

  if (
    !parameters.imageType ||
    !validTypes.includes(parameters.imageType)
  ) {
    throw new Error('The image type must be specified in the parameters object and be of a supported type');
  }
};

export default validateFileParameters;
