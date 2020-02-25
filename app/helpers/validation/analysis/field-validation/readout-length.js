const validateReadoutLength = (currentValues, currentErrors) => {
  const errors = { ...currentErrors };
  const validated = { ...currentValues };

  if (!validated.readoutLengthNorm && validated.readoutLength) {
    validated.readoutLength = '';
  } if (validated.readoutLengthNorm && !validated.readoutLength) {
    errors.readoutLength = 'missing column name';
  }

  return [validated, errors];
};

export default validateReadoutLength;
