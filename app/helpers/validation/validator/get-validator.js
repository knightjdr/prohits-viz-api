import validateDotplot from './dotplot.js';
import validateHeatmap from './heatmap.js';

const validateImageType = {
  dotplot: validateDotplot,
  heatmap: validateHeatmap,
};

const getValidator = imageType => (
  validateImageType[imageType] ? validateImageType[imageType] : () => {}
);

export default getValidator;
