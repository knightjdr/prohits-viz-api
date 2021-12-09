const settings = {
  dotplot: {
    abundanceCap: 50,
    abundanceType: 'positive',
    annotationFontSize: 12,
    conditionColumn: 'Conditions',
    fillColor: 'blue',
    invertColor: false,
    markerColor: '#000000',
    minAbundance: 0,
    readoutColumn: 'Readouts',

    edgeColor: 'blue',
    imageType: 'dotplot',
    primaryFilter: 0.01,
    resetRatios: false,
    scoreType: 'lte',
    secondaryFilter: 0.05,
  },
  heatmap: {
    abundanceCap: 50,
    abundanceType: 'positive',
    annotationFontSize: 12,
    conditionColumn: 'Conditions',
    fillColor: 'blue',
    invertColor: false,
    markerColor: '#000000',
    minAbundance: 0,
    readoutColumn: 'Readouts',

    imageType: 'heatmap',
  },
};

export default settings;
