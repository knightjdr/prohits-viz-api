const validateTypes = (fields, data, validator) => {
  const result = {
    errors: {},
    values: {},
  };

  fields.forEach((field) => {
    const inputValue = data[field];
    const validated = validator(field, inputValue);

    if (validated.error) {
      result.errors[field] = validated.error;
    } else {
      result.values[field] = validated.value;
    }
  });

  return result;
};

export default validateTypes;
