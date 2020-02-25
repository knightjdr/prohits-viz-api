export const scoreTypes = ['gte', 'lte'];

const validateScoreType = (value) => {
  if (scoreTypes.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

export default validateScoreType;
