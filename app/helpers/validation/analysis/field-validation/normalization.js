const validValues = ['none', 'readout', 'total'];

const validateNormalization = (value) => {
  if (!value || validValues.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

export const validateNormalizationSetting = (currentValues, currentErrors) => {
  const errors = { ...currentErrors };
  const validated = { ...currentValues };

  if (validated.normalization === 'readout' && !validated.normalizationReadout) {
    errors.normalizationReadout = 'missing column name';
  }

  return [validated, errors];
};

export default validateNormalization;
