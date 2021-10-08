import validateCrisprConvert from './crispr-convert-validate.js';
import validateFiles from '../../../../helpers/validation/analysis/field-validation/files.js';
import validatePVConvert from './pvconvert-validate.js';
import validateSaintDomainEnrich from './saint-domain-enrich-validate.js';
import validateSaintFEA from './saint-fea-validate.js';
import validateSaintSpecificity from './saint-specificity-validate.js';
import validateSaintStats from './saint-stats-validate.js';
import validateTextBiogridNetwork from './text-biogrid-validate.js';
import validateTextSymbolFix from './text-symbol-fix-validate.js';

const validateUtility = (fields) => {
  const { utility } = fields;

  if (utility === 'crispr_convert') {
    return validateCrisprConvert(fields);
  } if (utility === 'pvconvert') {
    return validatePVConvert(fields);
  } if (utility === 'saint_biogrid_network') {
    return validateTextBiogridNetwork(fields);
  } if (utility === 'saint_domain_enrich') {
    return validateSaintDomainEnrich(fields);
  } if (utility === 'saint_fea') {
    return validateSaintFEA(fields);
  } if (utility === 'saint_specificity') {
    return validateSaintSpecificity(fields);
  } if (utility === 'saint_stats') {
    return validateSaintStats(fields);
  } if (utility === 'text_biogrid_network') {
    return validateTextBiogridNetwork(fields);
  } if (utility === 'text_symbol_fix') {
    return validateTextSymbolFix(fields);
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
