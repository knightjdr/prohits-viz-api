export const colorSchemes = ['blue', 'blueRed', 'blueYellow', 'green', 'greyscale', 'red', 'yellow'];

const validateColor = (value) => {
  if (colorSchemes.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

export default validateColor;
