import fields from './fields.js';
import getValidator from './get-validator.js';
import validateFields from './validate-fields.js';

/* Validation checks parameters and if they are invalid, uses a default.
** It will throw an error for invalid settings that cannot be reconciled. */
const validate = (analysisType, data, files) => {
  const validator = getValidator(analysisType);
  let validated = validateFields(fields[analysisType], data, validator);
  if (validated.errors) {
    return validated;
  }

  validated = validateSettings(validated.values);
  if (validated.errors) {
    return validated;
  }

  validate.files = addFiles(files);
  return validated;
};

export default validate;
