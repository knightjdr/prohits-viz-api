import isJson from '../../../utils/is-json.js';
import validateFields from './validate-fields.js';
import validateParameters from './validate-parameters.js';

// Validates that an input body is JSON formatted and has the
// necessary fields and values for the interactive viewer. If the analysis
// type is "dotplot" or "heatmap", this includes checking for the "column"
// and "rows" props.
const validate = async (body) => {
  const requestData = isJson(body, false);

  // If the json is not valid, return err.
  if (!requestData) {
    throw new Error('Invalid body format');
  }

  const { parameters } = requestData;

  validateParameters(parameters);
  const validatedFields = await validateFields(requestData);

  return {
    parameters,
    ...validatedFields,
  };
};

export default validate;
