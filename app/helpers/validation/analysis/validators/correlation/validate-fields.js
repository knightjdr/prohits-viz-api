import criteria from '../../field-validation/criteria.js';
import validateColor from '../../field-validation/color.js';
import validateCommon, { getFieldValidator } from '../common/validate-fields.js';
import validateClusteringMethod from '../../field-validation/clustering-method.js';
import validateClusteringMetric from '../../field-validation/clustering-metric.js';
import validateClusteringType from '../../field-validation/clustering-type.js';
import validateCorrelation from '../../field-validation/correlation.js';

const validateFields = (type, value) => {
  const validatedResult = validateCommon(type, value);

  if (validatedResult === null) {
    const validateField = getFieldValidator(value);
    switch (type) {
      case 'clustering':
        return validateField(validateClusteringType, 'invalid value');
      case 'clusteringMethod':
        return validateField(validateClusteringMethod, 'invalid method');
      case 'clusteringOptimize':
        return validateField(criteria.isBoolean, 'should be a boolean');
      case 'conditionAbundanceFilter':
        return validateField(criteria.isNumber, 'should be a number');
      case 'conditionScoreFilter':
        return validateField(criteria.isNumber, 'should be a number');
      case 'correlation':
        return validateField(validateCorrelation, 'invalid algorithm');
      case 'cytoscapeCutoff':
        return validateField(criteria.isNumber, 'should be a number');
      case 'distance':
        return validateField(validateClusteringMetric, 'invalid metric');
      case 'fillColor':
        return validateField(validateColor, 'invalid color');
      case 'ignoreSourceTargetMatches':
        return validateField(criteria.isBoolean, 'should be a boolean');
      case 'readoutAbundanceFilter':
        return validateField(criteria.isNumber, 'should be a number');
      case 'readoutScoreFilter':
        return validateField(criteria.isNumber, 'should be a number');
      case 'useReplicates':
        return validateField(criteria.isBoolean, 'should be a boolean');
      default:
        return {};
    }
  }

  return validatedResult;
};

export default validateFields;
