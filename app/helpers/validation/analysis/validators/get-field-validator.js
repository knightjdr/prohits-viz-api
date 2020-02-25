import validateCorrelation from './correlation/validate-fields.js';
import validateDotplot from './dotplot/validate-fields.js';

const validateImageType = {
  correlation: validateCorrelation,
  dotplot: validateDotplot,
};

const getValidator = imageType => (
  validateImageType[imageType] ? validateImageType[imageType] : () => {}
);

export default getValidator;
