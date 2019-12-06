import { scoreTypes } from '../default-values.js';

const validateScoreType = (data, defaultSetting) => (
  data && scoreTypes.includes(data) ? data : defaultSetting
);

export default validateScoreType;
