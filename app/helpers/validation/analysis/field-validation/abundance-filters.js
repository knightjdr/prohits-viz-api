const validateAbundanceFilters = (currentValues, currentErrors) => {
  const errors = { ...currentErrors };
  const validated = { ...currentValues };

  if (validated.abundanceCap <= validated.minAbundance) {
    errors.abundanceCap = 'should be greater than minimum abundance';
  }

  return [validated, errors];
};

export default validateAbundanceFilters;
