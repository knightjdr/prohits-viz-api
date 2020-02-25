const validateControl = (currentValues, currentErrors) => {
  const errors = { ...currentErrors };
  const validated = { ...currentValues };

  if (!validated.ctrlSub && validated.control) {
    validated.control = '';
  } if (validated.ctrlSub && !validated.control) {
    errors.control = 'missing column name';
  }

  return [validated, errors];
};

export default validateControl;
