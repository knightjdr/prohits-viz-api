const defaultValues = require('./default-values');

const { colorSchemes } = defaultValues;

const color = (data, defaultSetting) => (
  data && colorSchemes.includes(data) ? data : defaultSetting
);

module.exports = color;
