const validateDotplot = require('../validation/dotplot');
const validateHeatmap = require('../validation/heatmap');

const validateSync = (body) => {
  switch (body.imageType) {
    case 'dotplot':
      return validateDotplot(body, ['columns']);
    default:
      return validateHeatmap(body, ['columns']);
  }
};

module.exports = {
  validateSync,
};
