import validateCircHeatmap from './validate-circheatmap-fields.js';
import validateHeatmapFields from './validate-heatmap-fields.js';
import validateScatterFields from './validate-scatter-fields.js';

const validImageTypes = ['circheatmap', 'dotplot', 'heatmap', 'scatter'];

const validateFields = async (data) => {
  const { parameters: { imageType } } = data;

  if (!validImageTypes.includes(imageType)) {
    throw new Error('Invalid image type');
  }

  if (imageType === 'circheatmap') {
    return validateCircHeatmap(data);
  } if (imageType === 'dotplot' || imageType === 'heatmap') {
    return validateHeatmapFields(data);
  } if (imageType === 'scatter') {
    return validateScatterFields(data);
  }
  return {};
};

export default validateFields;
