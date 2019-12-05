const commonFields = {
  heatmap: [
    'abundanceCap',
    'annotations',
    'columns',
    'fillColor',
    'invertColor',
    'markers',
    'minAbundance',
    'rows',
  ],
};

const requiredFields = {
  dotplot: [
    ...commonFields.heatmap,
    'edgeColor',
    'primaryFilter',
    'scoreType',
    'secondaryFilter',
  ],
  heatmap: [
    ...commonFields.heatmap,
  ],
};

const optionalFields = [
  'xLabel',
  'yLabel',
];

module.exports = {
  optionalFields,
  requiredFields,
};
