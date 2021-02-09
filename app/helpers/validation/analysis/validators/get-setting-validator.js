import validateConditionCondition from './condition-condition/validate-settings.js';
import validateCommonSettings from './common/validate-settings.js';
import validateDotplot from './dotplot/validate-settings.js';
import validateSCV from './scv/validate-settings.js';

const validateImageType = {
  'condition-condition': validateConditionCondition,
  correlation: validateCommonSettings,
  dotplot: validateDotplot,
  scv: validateSCV,
  specificity: validateCommonSettings,
};

const getValidator = (imageType) => (
  validateImageType[imageType] ? validateImageType[imageType] : () => {}
);

export default getValidator;
