import isValidHex from '../../../../utils/is-valid-hex.js';

const isValidColor = (color, defaultSetting) => (
  isValidHex(color) ? color : defaultSetting
);

export default isValidColor;
