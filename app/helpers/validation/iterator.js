const iterator = (props, data, defaults, validator, errs) => (
  props.reduce((accum, prop) => {
    const inputValue = data[prop];
    const validated = validator(prop, inputValue, defaults[prop]);
    if (validated instanceof Error) {
      errs.push(validated);
    } else if (validated !== null) {
      const newProp = [];
      newProp[prop] = validated;
      return {
        ...accum,
        ...newProp,
      };
    }
    return accum;
  }, {})
);

module.exports = iterator;
