export const scoreTypes = ['gte', 'lte'];

const validateScoreType = (data, defaultSetting) => (
  data && scoreTypes.includes(data) ? data : defaultSetting
);

export default validateScoreType;
