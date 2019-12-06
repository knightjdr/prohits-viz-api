import defaultValues from './default-values.js';

const { scoreTypes } = defaultValues;

const scoreType = (data, defaultSetting) => (
  data && scoreTypes.includes(data) ? data : defaultSetting
);

export default scoreType;
