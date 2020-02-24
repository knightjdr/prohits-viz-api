import criteria from './criteria.js';
import isInRange from '../../../../utils/is-in-range.js';
import isObject from '../../../../utils/is-object.js';

const defaults = {
  fontSize: 12,
};

/* An annotations object should be of the form:

annotations = {
  fontSize: 12,
  list: [
    {
      position: { x: 0, y: 0.5 },
      text: 'text,
    },
  ],
},;

*/

const isValidAnnotationList = list => (
  isObject(list)
  && Object.values(list).every(annotation => (
    annotation.text
    && annotation.position
    && isObject(annotation.position)
    && isInRange(annotation.position.x, 0, 1)
    && isInRange(annotation.position.y, 0, 1)
  ))
);

const validateAnnotations = (data) => {
  if (
    data?.list
    && isValidAnnotationList(data.list)
  ) {
    return {
      fontSize: criteria.isNumber(data.fontSize, defaults.fontSize),
      list: data.list,
    };
  }

  return null;
};

export default validateAnnotations;
