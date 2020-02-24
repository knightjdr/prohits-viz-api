import validate from '../../../helpers/validation/analysis/validate.js';


const validateDotplot = (form, files = []) => {
  const validated = validate('dotplot', form, files);
  return validated;

  // Clear control column if not required.
  /* if (validated.control && !isTrue(validated.ctrlSub)) {
    validated.control = '';
  }

  // Clear readout length column if not required.
  if (validated.readoutLength && !isTrue(validated.readoutLengthNorm)) {
    validated.readoutLength = '';
  }

  // Remove log property if none.
  if (validated.logBase === 'none') {
    delete validated.logBase;
  }

  // Remove user clustering fields if not required.
  if (validated.clustering !== 'none') {
    delete validated.conditionClustering;
    delete validated.readoutClustering;
  } else {
    if (validated.conditionList) {
      validated.conditionList.replace('\n', ' ');
      const re = RegExp(/([^\s,]+)/g);
      validated.conditionList = validated.conditionList.match(re).join(',');
    }
    if (validated.readoutList) {
      validated.readoutList.replace('\n', ' ');
      const re = RegExp(/([^\s,]+)/g);
      validated.readoutList = validated.readoutList.match(re).join(',');
    }
  }

  // Delete unneeding fields and "false" fields.
  validated = Object.entries(validated).reduce((accum, [key, value]) => {
    if (
      value &&
      value !== 'false' &&
      acceptedFields.includes(key)
    ) {
      const newProp = {};
      newProp[key] = value;
      return {
        ...accum,
        ...newProp,
      };
    }
    return accum;
  }, {});

  // Add files as comma separated list.
  validated.fileList = files.map(file => `files/${file.originalname}`).join(',');

  return validated; */
};

export default validateDotplot;
