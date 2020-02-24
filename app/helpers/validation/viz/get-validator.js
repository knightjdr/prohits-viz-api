import validateDotplot from './validators/dotplot.js';
import validateHeatmap from './validators/heatmap.js';

const validateImageType = {
  dotplot: validateDotplot,
  heatmap: validateHeatmap,
};

const getValidator = imageType => (
  validateImageType[imageType] ? validateImageType[imageType] : () => {}
);

export default getValidator;
