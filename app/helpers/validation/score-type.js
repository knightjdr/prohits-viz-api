const defaultValues = require('./default-values');

const { scoreTypes } = defaultValues;

const scoreType = (data, defaultSetting) => (
  data && scoreTypes.includes(data) ? data : defaultSetting
);

module.exports = scoreType;
