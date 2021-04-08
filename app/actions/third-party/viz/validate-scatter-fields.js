const validatePlots = (plots) => {
  if (
    !plots
    || !Array.isArray(plots)
  ) {
    throw new Error('The file must include an array of "plots"');
  }

  if (
    plots.length === 0
    || !plots[0].labels
    || !plots[0].name
    || !plots[0].points
  ) {
    throw new Error('Each plot should have a "name", "labels" for the x and y axis and an array of "points"');
  }

  if (
    !Array.isArray(plots[0].points)
    || plots[0].points[0].label === undefined
    || plots[0].points[0].x === undefined
    || plots[0].points[0].y === undefined
  ) {
    throw new Error('Plot "points" should be an array with each point having a label, x and y value');
  }
};

const validateScatterFields = (data) => {
  const {
    plots,
  } = data;

  validatePlots(plots);

  return data;
};

export default validateScatterFields;
