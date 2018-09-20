const iterator = require('./iterator');
const parameters = require('./parameters');
const validator = require('./validator');

const { settings } = parameters;

const neededProps = {
  dotplot: [
    'abundanceCap',
    'annotationFontSize',
    'annotations',
    'columns',
    'edgeColor',
    'fillColor',
    'invertColor',
    'markerColor',
    'markers',
    'primaryFilter',
    'rows',
    'scoreType',
    'secondaryFilter',
  ],
  heatmap: [
    'abundanceCap',
    'annotationFontSize',
    'annotations',
    'columns',
    'edgeColor',
    'invertColor',
    'markerColor',
    'markers',
    'rows',
  ],
};

/* Validation checks parameters and if they are invalid, uses the default.
** If, however, the row or columns objects are invalid, returns an err. Properties
** to ignore can be specied in the second arg as an array of strings. */
const validate = (imageType, data, ignore = []) => {
  const props = neededProps[imageType].filter(prop => !ignore.includes(prop));
  const errs = [];
  const validateFunc = validator('dotplot');
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
