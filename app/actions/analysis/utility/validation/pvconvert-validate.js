const validTypes = ['dotplot', 'heatmap', 'scatter'];

const validatePVConvert = (fields) => {
  const { imageType } = fields;

  const errors = {};
  if (!validTypes.includes(imageType)) {
    errors.imageType = 'Invalid image type';
  }

  return {
    fields: { imageType },
    errors,
  };
};

export default validatePVConvert;
