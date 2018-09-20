const parameters = require('./parameters');

const { colorSchemes } = parameters;

const color = (data, defaultSetting) => (
  data && colorSchemes.includes(data) ? data : defaultSetting
);

module.exports = color;
