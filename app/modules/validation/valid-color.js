const validHex = require('../helpers/valid-hex');

const validColor = (color, defaultSetting) => (
  validHex(color) ? color : defaultSetting
);

module.exports = validColor;
