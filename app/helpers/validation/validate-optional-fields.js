const validateOptionalFields = (fields, data) => (
  fields.reduce((accum, prop) => {
    if (data[prop]) {
      return {
        ...accum,
        [prop]: data[prop],
      };
    }
    return accum;
  }, {})
);

module.exports = validateOptionalFields;
