const validateDotplot = require('./dotplot');
const validateHeatmap = require('./heatmap');

const validateImageType = {
  dotplot: validateDotplot,
  heatmap: validateHeatmap,
};

const getValidator = imageType => (
  validateImageType[imageType] ? validateImageType[imageType] : () => {}
);

module.exports = getValidator;
