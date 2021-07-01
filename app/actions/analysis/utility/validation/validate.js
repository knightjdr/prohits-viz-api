import validatePVConvert from './pvconvert-validate.js';
import validateSaintStats from './saint-stats-validate.js';
import validateFiles from '../../../../helpers/validation/analysis/field-validation/files.js';

const validateUtility = (fields) => {
  const { utility } = fields;

  if (utility === 'pvconvert') {
    return validatePVConvert(fields);
  } if (utility === 'saintstats') {
    return validateSaintStats(fields);
  }
  return { fields: null, errors: null };
};

const validate = (fields, file) => {
  const { utility } = fields;

  const validated = validateUtility(fields);

  return {
    errors: {
      ...validated.errors,
      ...validateFiles(file).errors,
    },
    fields: {
      utility,
      ...validated.fields,
    },
  };
};

export default validate;
