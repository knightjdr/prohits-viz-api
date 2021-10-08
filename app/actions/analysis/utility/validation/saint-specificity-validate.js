import isTrue from '../../../../utils/is-true.js';

const metricOptions = [
  'dscore',
  'fe',
  'sscore',
  'wdscore',
  'zscore',
];

const validateSaintSpecificity = (fields) => {
  const { controlSubtract, metric } = fields;

  const errors = {};

  if (!metricOptions.includes(metric)) {
    errors.metric = 'Invalid metric option';
  }

  return {
    fields: {
      controlSubtract: isTrue(controlSubtract),
      metric,
    },
    errors,
  };
};

export default validateSaintSpecificity;
