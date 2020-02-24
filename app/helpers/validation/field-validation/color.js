export const colorSchemes = ['blue', 'blueRed', 'blueYellow', 'green', 'greyscale', 'red', 'yellow'];

const validateColor = (data, defaultSetting) => (
  data && colorSchemes.includes(data) ? data : defaultSetting
);

export default validateColor;
