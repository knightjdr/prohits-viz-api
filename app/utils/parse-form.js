import parseIfJSON from './parse-if-json.js';

export const parseArray = (value, defaultValue = []) => {
  if (Array.isArray(value)) {
    return value;
  }

  const parsed = parseIfJSON(value);
  if (parsed && Array.isArray(parsed)) {
    return parsed;
  }

  return defaultValue;
};
