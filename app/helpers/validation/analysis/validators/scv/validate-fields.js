import criteria from '../../field-validation/criteria.js';
import validateCommon, { getFieldValidator } from '../common/validate-fields.js';

const acceptedIDTypes = [
  'ensemblg',
  'ensemblp',
  'entrez',
  'hgnc',
  'refseqg',
  'refseqp',
  'symbol',
  'uniprotacc',
  'uniprotid',
];

const validateIDType = (value) => {
  if (!value || acceptedIDTypes.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

const acceptedMetrics = ['', 'interaction'];

const validateKnownMetric = (value) => {
  if (!value || acceptedMetrics.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

const validateFields = (type, value) => {
  const validatedResult = validateCommon(type, value);

  if (validatedResult === null) {
    const validateField = getFieldValidator(value);
    switch (type) {
      case 'abundanceCap':
        return validateField(criteria.isNumber, 'should be a number');
      case 'abundanceFilterColumn':
        return validateField(criteria.isString, 'should be a string');
      case 'conditionIDType':
        return validateField(validateIDType, `invalid ID type: ${value}`);
      case 'conditionMapColumn':
        return validateField(criteria.isString, 'should be a string');
      case 'conditionMapFile':
        return validateField(criteria.isArray, 'should be an array');
      case 'known':
        return validateField(validateKnownMetric, `invalid metric: ${value}`);
      case 'minAbundance':
        return validateField(criteria.isNumber, 'should be a number');
      case 'primaryFilter':
        return validateField(criteria.isNumber, 'should be a number');
      case 'proteinTissues':
        return validateField(criteria.isArray, 'should be an array');
      case 'readoutIDType':
        return validateField(validateIDType, `invalid ID type: ${value}`);
      case 'readoutMapColumn':
        return validateField(criteria.isString, 'should be a string');
      case 'readoutMapFile':
        return validateField(criteria.isArray, 'should be an array');
      case 'rnaTissues':
        return validateField(criteria.isArray, 'should be an array');
      case 'specificity':
        return validateField(criteria.isBoolean, 'should be a boolean');
      case 'verticalHeatmap':
        return validateField(criteria.isBoolean, 'should be a boolean');
      default:
        return {};
    }
  }

  return validatedResult;
};

export default validateFields;
