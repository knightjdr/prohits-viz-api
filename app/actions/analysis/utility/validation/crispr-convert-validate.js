const toolOptions = [
  'bagel',
  'drugz',
  'mageck',
  'ranks',
];

const validateCrisprConvert = (fields) => {
  const { tool } = fields;

  const errors = {};

  if (!toolOptions.includes(tool)) {
    errors.tool = 'Invalid tool specified';
  }

  return {
    fields: {
      tool,
    },
    errors,
  };
};

export default validateCrisprConvert;
