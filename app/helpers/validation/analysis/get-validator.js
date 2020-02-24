import validateCorrelation from './validators/correlation.js';
import validateDotplot from './validators/dotplot.js';

const validateImageType = {
  correlation: validateCorrelation,
  dotplot: validateDotplot,
};

const getValidator = imageType => (
  validateImageType[imageType] ? validateImageType[imageType] : () => {}
);

export default getValidator;
