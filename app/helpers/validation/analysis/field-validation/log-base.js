const acceptedBases = ['none', 'e', '2', '10'];

const validateLogBase = value => (
  !value || acceptedBases.includes(value)
);

export default validateLogBase;
