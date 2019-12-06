import defaultValues from './default-values.js';

const { colorSchemes } = defaultValues;

const color = (data, defaultSetting) => (
  data && colorSchemes.includes(data) ? data : defaultSetting
);

export default color;
