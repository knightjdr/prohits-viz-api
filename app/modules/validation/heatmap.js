
const iterator = require('./iterator');
const parameters = require('./parameters');
const validate = require('./validate');

const { settings } = parameters;
const defaults = settings.heatmap;

/* Validation checks parameters and if they are invalid, uses the default.
** If, however, the row or columns objects are invalid, returns an err. Properties
** to ignore can be specied in the second arg as an array of strings. */
const validateHeatmap = (data, ignore = []) => {
  const neededProps = [
    'abundanceCap',
    'annotations',
    'columns',
    'fillColor',
    'invertColor',
    'markers',
    'rows',
  ].filter(prop => !ignore.includes(prop));

  const errs = [];
  const validator = validate('heatmap');
  const validatedObj = iterator(neededProps, data, defaults, validator, errs);

  return {
    err: errs[0],
    data: {
      ...validatedObj,
      imageType: 'heatmap',
    },
  };
};

module.exports = validateHeatmap;
