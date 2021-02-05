import isJson from '../../../utils/is-json.js';
import validateFields from './validate-fields.js';
import validateParameters from './validate-parameters.js';

// Validates that an input body is JSON formatted and has the
// necessary fields and values for the interactive viewer. If the analysis
// type is "dotplot" or "heatmap", this includes checking for the "column"
// and "rows" props.
const validate = (body) => {
  const data = isJson(body, false);

  // If the json is not valid, return err.
  if (!data) {
    throw new Error('Invalid body format');
  }

  const { parameters } = data;

  validateParameters(parameters);
  validateFields(parameters.imageType, data);

  return data;
};

export default validate;
