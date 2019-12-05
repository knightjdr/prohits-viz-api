const colorSchemes = ['blue', 'blueRed', 'blueYellow', 'green', 'greyscale', 'red', 'yellowB'];

const common = {
  heatmap: {
    abundanceCap: 50,
    annotationFontSize: 12,
    conditionColumn: 'Conditions',
    fillColor: 'blue',
    invertColor: false,
    markerColor: '#000000',
    minAbundance: 0,
    readoutColumn: 'Readouts',
  },
};

const settings = {
  dotplot: {
    ...common.heatmap,
    edgeColor: 'blueBlack',
    imageType: 'dotplot',
    primaryFilter: 0.01,
    scoreType: 'lte',
    secondaryFilter: 0.05,
  },
  heatmap: {
    ...common.heatmap,
    imageType: 'heatmap',
  },
};

const scoreTypes = ['gte', 'lte'];

module.exports = {
  colorSchemes,
  scoreTypes,
  settings,
};
