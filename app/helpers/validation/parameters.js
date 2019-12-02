const colorSchemes = ['blueBlack', 'blueRed', 'blueYellow', 'greenBlack', 'greyscale', 'redBlack', 'yellowBlack'];

const common = {
  abundanceCap: 50,
  annotationFontSize: 12,
  conditionColumn: 'Conditions',
  fillColor: 'blueBlack',
  invertColor: false,
  markerColor: '#000000',
  minAbundance: 0,
  readoutColumn: 'Readouts',
};

const settings = {
  dotplot: {
    ...common,
    edgeColor: 'blueBlack',
    imageType: 'dotplot',
    primaryFilter: 0.01,
    scoreType: 'lte',
    secondaryFilter: 0.05,
  },
  heatmap: {
    ...common,
    imageType: 'heatmap',
  },
};

const scoreTypes = ['gte', 'lte'];

module.exports = {
  colorSchemes,
  scoreTypes,
  settings,
};
