import isInRange from '../../../../utils/is-in-range.js';
import isObject from '../../../../utils/is-object.js';
import isValidColor from './is-valid-color.js';

const defaults = {
  color: '#000000',
};

/* A markers array should be of the form:

markers = [
  { height: 10, width, 10, x: 0.2, y: 0.5 },
];

*/

const isValidMarkerList = list => (
  isObject(list)
  && Object.values(list).every(marker => (
    Number.isInteger(marker.height)
    && Number.isInteger(marker.width)
    && isInRange(marker.x, 0, 1)
    && isInRange(marker.y, 0, 1)
  ))
);

const validateMarkers = (data) => {
  if (
    data?.list
    && isValidMarkerList(data.list)
  ) {
    return {
      color: isValidColor(data.color, defaults.color),
      list: data.list,
    };
  }

  return null;
};

export default validateMarkers;
