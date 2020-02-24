const validValues = ['none', 'readout', 'total'];

const validateNormalization = value => (
  !value || validValues.includes(value)
);

export default validateNormalization;
