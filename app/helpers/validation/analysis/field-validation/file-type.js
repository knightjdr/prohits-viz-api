const validFileTypes = [
  'bagel',
  'drugz',
  'mageck',
  'ranks',
  'crapome',
  'saint',
  'other',
];

const validateFileType = (value) => {
  if (validFileTypes.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

export default validateFileType;
