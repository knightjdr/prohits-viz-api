const validatePlots = (plots) => {
  if (
    !plots
    || !Array.isArray(plots)
  ) {
    throw new Error('The file must include an array of "plots"');
  }

  if (
    plots.length === 0
    || !plots[0].name
    || !plots[0].readouts
  ) {
    throw new Error('Each plot should have a "name" and an array of "readouts"');
  }

  if (
    !Array.isArray(plots[0].readouts)
    || plots[0].readouts[0].label === undefined
    || plots[0].readouts[0].segments === undefined
  ) {
    throw new Error('Plot "readouts" should be an array with each point having a label and segments');
  }
};

const validateCircHeatmapFields = (data) => {
  const {
    plots,
  } = data;

  validatePlots(plots);
};

export default validateCircHeatmapFields;
