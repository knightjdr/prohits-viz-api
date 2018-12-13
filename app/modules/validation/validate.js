const iterator = require('./iterator');
const parameters = require('./parameters');
const validator = require('./validator');

const { settings } = parameters;

const neededProps = {
  dotplot: [
    'abundanceCap',
    'annotations',
    'columns',
    'edgeColor',
    'fillColor',
    'invertColor',
    'markers',
    'minAbundance',
    'primaryFilter',
    'rows',
    'scoreType',
    'secondaryFilter',
  ],
  heatmap: [
    'abundanceCap',
    'annotations',
    'columns',
    'fillColor',
    'invertColor',
    'markers',
    'minAbundance',
    'rows',
  ],
};

/* Validation checks parameters and if they are invalid, uses the default.
** If, however, the row or columns objects are invalid, returns an err. Properties
** to ignore can be specied in the second arg as an array of strings. */
const validate = (imageType, data, ignore = []) => {
  const props = neededProps[imageType].filter(prop => !ignore.includes(prop));
  const errs = [];
  const validateFunc = validator(imageType);
  const validatedObj = iterator(props, data, settings[imageType], validateFunc, errs);

  return {
    err: errs[0],
    data: {
      ...validatedObj,
      imageType,
    },
  };
};

module.exports = validate;
