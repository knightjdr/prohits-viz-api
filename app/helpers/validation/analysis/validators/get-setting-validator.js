import validateCorrelation from './correlation/validate-settings.js';
import validateDotplot from './dotplot/validate-settings.js';

const validateImageType = {
  correlation: validateCorrelation,
  dotplot: validateDotplot,
};

const getValidator = imageType => (
  validateImageType[imageType] ? validateImageType[imageType] : () => {}
);

export default getValidator;
