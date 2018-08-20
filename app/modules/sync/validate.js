const criteria = require('../helpers/validate-criteria');

const acceptedColors = ['blueBlack', 'greenBlack', 'greyscale', 'redBlack', 'yellowBlack'];
const acceptedScores = ['gte', 'lte'];

const defaultSettings = {
  abundanceCap: 50,
  edgeColor: 'blueBlack',
  fillColor: 'blueBlack',
  imageType: 'dotplot',
  invertColor: false,
  primaryFilter: 0.01,
  scoreType: 'lte',
  secondaryFilter: 0.05,
};

/* Validation checks parameters but does not check row object. Assumes
** it is a valid array. */
const validateDotplot = (body) => {
  const {
    abundanceCap,
    edgeColor,
    fillColor,
    invertColor,
    primaryFilter,
    rows,
    scoreType,
    secondaryFilter,
  } = body;
  const syncObj = {
    imageType: 'dotplot',
    rows,
  };
  syncObj.abundanceCap = criteria.isNumber(abundanceCap, defaultSettings.abundanceCap);
  syncObj.edgeColor = edgeColor && acceptedColors.includes(edgeColor) ?
    edgeColor : defaultSettings.edgeColor;
  syncObj.fillColor = fillColor && acceptedColors.includes(fillColor) ?
    fillColor : defaultSettings.fillColor;
  syncObj.invertColor = criteria.isBoolean(invertColor, defaultSettings.invertColor);
  syncObj.primaryFilter = criteria.isNumber(primaryFilter, defaultSettings.primaryFilter);
  syncObj.scoreType = scoreType && acceptedScores.includes(scoreType) ?
    scoreType : defaultSettings.scoreType;
  syncObj.secondaryFilter = criteria.isNumber(secondaryFilter, defaultSettings.secondaryFilter);

  return syncObj;
};

const validateHeatmap = (body) => {
  const {
    abundanceCap,
    fillColor,
    invertColor,
    rows,
    scoreType,
  } = body;
  const syncObj = {
    imageType: 'heatmap',
    rows,
  };
  syncObj.abundanceCap = criteria.isNumber(abundanceCap, defaultSettings.abundanceCap);
  syncObj.fillColor = fillColor && acceptedColors.includes(fillColor) ?
    fillColor : defaultSettings.fillColor;
    syncObj.invertColor = criteria.isBoolean(invertColor, defaultSettings.invertColor);
  syncObj.scoreType = scoreType && acceptedScores.includes(scoreType) ?
    scoreType : defaultSettings.scoreType;

  return syncObj;
};

const validateSync = (body) => {
  switch (body.imageType) {
    case 'dotplot':
      return validateDotplot(body);
    default:
      return validateHeatmap(body);
  }
};

module.exports = {
  validateDotplot,
  validateHeatmap,
  validateSync,
};
