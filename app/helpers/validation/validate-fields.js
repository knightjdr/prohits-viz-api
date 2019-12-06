const validateFields = (fields, data, validator) => (
  fields.reduce((accum, field) => {
    const inputValue = data[field];
    const validated = validator(field, inputValue);

    if (validated !== null) {
      return {
        ...accum,
        [field]: validated,
      };
    }
    return accum;
  }, {})
);

export default validateFields;
