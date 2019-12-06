import validHex from '../../utils/valid-hex.js';

const validColor = (color, defaultSetting) => (
  validHex(color) ? color : defaultSetting
);

export default validColor;
