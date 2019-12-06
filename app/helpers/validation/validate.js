import getValidator from './validator/get-validator.js';
import validateFields from './validate-fields.js';
import validateOptionalFields from './validate-optional-fields.js';
import { optionalFields, requiredFields } from './fields.js';

const getFields = (imageType, ignoreFields) => (
  requiredFields[imageType].filter(field => !ignoreFields.includes(field))
);

/* Validation checks parameters and if they are invalid, uses a default.
** It will throw an error for invalid settings that cannot be reconciled. */
const validate = (imageType, data, ignoreFields = []) => {
  const fields = getFields(imageType, ignoreFields);
  const validator = getValidator(imageType);
  const validated = {
    ...validateFields(fields, data, validator),
    ...validateOptionalFields(optionalFields, data),
  };

  return {
    ...validated,
    imageType,
  };
};

export default validate;
