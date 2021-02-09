import validateControl from '../../field-validation/control.js';
import validateReadoutLength from '../../field-validation/readout-length.js';
import { validateNormalizationSetting } from '../../field-validation/normalization.js';

const validateSettings = (settings) => {
  const validated = { values: { ...settings } };

  [validated.values, validated.errors] = validateControl(validated.values, validated.errors);
  [validated.values, validated.errors] = validateNormalizationSetting(validated.values, validated.errors);
  [validated.values, validated.errors] = validateReadoutLength(validated.values, validated.errors);

  return validated;
};

export default validateSettings;
