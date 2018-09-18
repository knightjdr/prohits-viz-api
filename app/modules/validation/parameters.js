const colorSchemes = ['blueBlack', 'greenBlack', 'greyscale', 'redBlack', 'yellowBlack'];

const settings = {
  dotplot: {
    abundanceCap: 50,
    edgeColor: 'blueBlack',
    fillColor: 'blueBlack',
    imageType: 'dotplot',
    invertColor: false,
    primaryFilter: 0.01,
    scoreType: 'lte',
    secondaryFilter: 0.05,
  },
  heatmap: {
    abundanceCap: 50,
    fillColor: 'blueBlack',
    imageType: 'dotplot',
    invertColor: false,
  },
};

const scoreTypes = ['gte', 'lte'];

module.exports = {
  colorSchemes,
  scoreTypes,
  settings,
};
