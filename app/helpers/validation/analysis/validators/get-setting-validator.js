import validateConditionCondition from './condition-condition/validate-settings.js';
import validateCorrelation from './correlation/validate-settings.js';
import validateDotplot from './dotplot/validate-settings.js';
import validateSpecifcity from './specificity/validate-settings.js';

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
