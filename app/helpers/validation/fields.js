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

export const requiredFields = {
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

export const optionalFields = [
  'xLabel',
  'yLabel',
];
