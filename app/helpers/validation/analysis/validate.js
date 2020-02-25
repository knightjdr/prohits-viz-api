import fields from './fields.js';
import getFieldValidator from './validators/get-field-validator.js';
import getSettingValidator from './validators/get-setting-validator.js';
import validateTypes from './validate-types.js';
import validateFiles from './field-validation/files.js';

/* Validation checks parameters and if they are invalid, uses a default.
** It will throw an error for invalid settings that cannot be reconciled. */
const validate = (tool, data, files) => {
  let validated = validateFiles(files);
  if (validated.errors && Object.keys(validated.errors).length > 0) {
    return validated;
  }

  const fieldValidator = getFieldValidator(tool);
  validated = validateTypes(fields[tool], data, fieldValidator);
  if (validated.errors && Object.keys(validated.errors).length > 0) {
    return validated;
  }

  const validateSettings = getSettingValidator(tool);
  return validateSettings(validated.values);
};

export default validate;
