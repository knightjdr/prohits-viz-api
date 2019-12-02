const parameters = require('./parameters');

const { scoreTypes } = parameters;

const scoreType = (data, defaultSetting) => (
  data && scoreTypes.includes(data) ? data : defaultSetting
);

module.exports = scoreType;
