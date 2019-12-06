export const colorSchemes = ['blue', 'blueRed', 'blueYellow', 'green', 'greyscale', 'red', 'yellow'];

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

export const scoreTypes = ['gte', 'lte'];

export const settings = {
  dotplot: {
    ...common.heatmap,
    edgeColor: 'blue',
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
