const acceptedBases = ['none', 'e', '2', '10'];

const validateLogBase = (value) => {
  if (!value || acceptedBases.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

export default validateLogBase;
