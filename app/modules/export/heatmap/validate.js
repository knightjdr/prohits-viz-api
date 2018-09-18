const validateDotplot = require('../../validation/dotplot');
const validateHeatmap = require('../../validation/heatmap');

const validate = (body) => {
  switch (body.imageType) {
    case 'dotplot':
      return validateDotplot(body);
    default:
      return validateHeatmap(body);
  }
};

module.exports = {
  validate,
};
