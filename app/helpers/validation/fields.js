const commonFields = {
  heatmap: [
    'abundanceCap',
    'annotations',
    'columnDB',
    'columnOrder',
    'fillColor',
    'invertColor',
    'markers',
    'minAbundance',
    'rowDB',
    'rowOrder',
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
