import validateCircHeatmap from './validate-circheatmap-fields.js';
import validateHeatmapFields from './validate-heatmap-fields.js';
import validateScatterFields from './validate-scatter-fields.js';

const validImageTypes = ['circheatmap', 'dotplot', 'heatmap', 'scatter'];

const validateFields = (imageType, data) => {
  if (!validImageTypes.includes(imageType)) {
    throw new Error('Invalid image type');
  }

  if (imageType === 'circheatmap') {
    validateCircHeatmap(data);
  } if (imageType === 'dotplot' || imageType === 'heatmap') {
    validateHeatmapFields(data);
  } if (imageType === 'scatter') {
    validateScatterFields(data);
  }
};

export default validateFields;
