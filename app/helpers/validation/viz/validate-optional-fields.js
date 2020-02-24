const validateOptionalFields = (fields, data) => (
  fields.reduce((accum, field) => {
    if (data[field]) {
      return {
        ...accum,
        [field]: data[field],
      };
    }
    return accum;
  }, {})
);

export default validateOptionalFields;
