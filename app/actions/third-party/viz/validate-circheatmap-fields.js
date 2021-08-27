const validateCircles = (circles) => {
  if (
    !circles ||
    !circles.order
  ) {
    throw new Error('The file must include a "circles" object with the "order" field');
  }

  if (
    !Array.isArray(circles.order) ||
    circles.order[0].color === undefined ||
    circles.order[0].max === undefined ||
    circles.order[0].min === undefined ||
    circles.order[0].attribute === undefined
  ) {
    throw new Error('The "order" should be an array with each point having a color, max, min and attribute name');
  }
};

const validatePlots = (plots) => {
  if (
    !plots ||
    !Array.isArray(plots)
  ) {
    throw new Error('The file must include an array of "plots"');
  }

  if (
    plots.length === 0 ||
    !plots[0].name ||
    !plots[0].readouts
  ) {
    throw new Error('Each plot should have a "name" and an array of "readouts"');
  }

  if (
    !Array.isArray(plots[0].readouts) ||
    plots[0].readouts[0].label === undefined ||
    plots[0].readouts[0].segments === undefined
  ) {
    throw new Error('Plot "readouts" should be an array with each point having a label and segments');
  }
};

const validateCircHeatmapFields = (data) => {
  const {
    circles,
    plots,
  } = data;

  validateCircles(circles);
  validatePlots(plots);

  return data;
};

export default validateCircHeatmapFields;
