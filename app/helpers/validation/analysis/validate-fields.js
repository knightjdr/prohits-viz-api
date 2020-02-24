const validateFields = (fields, data, validator) => {
  const result = {
    errors: {},
    validated: {},
  };

  fields.forEach((field) => {
    const inputValue = data[field];
    const validated = validator(field, inputValue);

    if (validated.err) {
      result.errors[field] = validated.err;
    } else {
      result.validated[field] = validated.value;
    }
  });

  return result;
};

export default validateFields;
