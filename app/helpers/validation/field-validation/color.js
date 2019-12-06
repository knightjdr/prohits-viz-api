import { colorSchemes } from '../default-values.js';

const validateColor = (data, defaultSetting) => (
  data && colorSchemes.includes(data) ? data : defaultSetting
);

export default validateColor;
