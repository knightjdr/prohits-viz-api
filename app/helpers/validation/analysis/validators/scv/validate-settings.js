import validateAbundanceFilters from '../../field-validation/abundance-filters.js';
import validateCommonSettings from '../common/validate-settings.js';

const validateAbundanceColumn = (currentValues) => {
  const validated = { ...currentValues };

  if (Array.isArray(validated.abundance)) {
    validated.otherAbundance = validated.abundance.slice(1);
    [validated.abundance] = validated.abundance;
  }

  return validated;
};

const validateSettings = (settings) => {
  const validated = validateCommonSettings(settings);

  validated.values = validateAbundanceColumn(validated.values);
  [validated.values, validated.errors] = validateAbundanceFilters(validated.values, validated.errors);

  return validated;
};

export default validateSettings;
