import validatePVConvert from './pvconvert-validate.js';
import validateSaintDomainEnrich from './saint-domain-enrich-validate.js';
import validateSaintFEA from './saint-fea-validate.js';
import validateSaintStats from './saint-stats-validate.js';
import validateFiles from '../../../../helpers/validation/analysis/field-validation/files.js';

const validateUtility = (fields) => {
  const { utility } = fields;

  if (utility === 'pvconvert') {
    return validatePVConvert(fields);
  } if (utility === 'saint_domain_enrich') {
    return validateSaintDomainEnrich(fields);
  } if (utility === 'saint_fea') {
    return validateSaintFEA(fields);
  } if (utility === 'saint_stats') {
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
