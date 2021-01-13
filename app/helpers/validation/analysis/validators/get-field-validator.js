import validateConditionCondition from './condition-condition/validate-fields.js';
import validateCorrelation from './correlation/validate-fields.js';
import validateDotplot from './dotplot/validate-fields.js';
import validateSpecifcity from './specificity/validate-fields.js';

const validateImageType = {
  'condition-condition': validateConditionCondition,
  correlation: validateCorrelation,
  dotplot: validateDotplot,
  specificity: validateSpecifcity,
};

const getValidator = (imageType) => (
  validateImageType[imageType] ? validateImageType[imageType] : () => {}
);

export default getValidator;
