const colorSchemes = ['blueBlack', 'blueRed', 'blueYellow', 'greenBlack', 'greyscale', 'redBlack', 'yellowBlack'];

const settings = {
  dotplot: {
    abundanceCap: 50,
    annotationFontSize: 12,
    edgeColor: 'blueBlack',
    fillColor: 'blueBlack',
    imageType: 'dotplot',
    invertColor: false,
    markerColor: '#000000',
    minAbundance: 0,
    primaryFilter: 0.01,
    scoreType: 'lte',
    secondaryFilter: 0.05,
  },
  heatmap: {
    abundanceCap: 50,
    annotationFontSize: 12,
    fillColor: 'blueBlack',
    imageType: 'dotplot',
    invertColor: false,
    markerColor: '#000000',
    minAbundance: 0,
  },
};

const scoreTypes = ['gte', 'lte'];

module.exports = {
  colorSchemes,
  scoreTypes,
  settings,
};
