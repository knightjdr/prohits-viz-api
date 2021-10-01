const validDimensions = ['area', 'diameter'];

const validateRatioDimension = (value) => {
  if (validDimensions.includes(value)) {
    return [true, value];
  }

  return [false, null];
};

export default validateRatioDimension;
