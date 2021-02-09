const validateScoreFilters = (currentValues, currentErrors) => {
  const errors = { ...currentErrors };
  const validated = { ...currentValues };

  if (
    validated.scoreType === 'lte'
    && validated.secondaryFilter < validated.primaryFilter
  ) {
    errors.secondaryFilter = 'should be greater than or equal to primary filter';
  } if (
    validated.scoreType === 'gte'
    && validated.secondaryFilter > validated.primaryFilter
  ) {
    errors.secondaryFilter = 'should be less than or equal to primary filter';
  }

  return [validated, errors];
};

export default validateScoreFilters;
