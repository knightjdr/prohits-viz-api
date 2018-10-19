// Checks if a string is valid json and returns if so, else returns false.

const isJSON = (jsonString, isString = true) => {
  try {
    const json = isString ? JSON.parse(jsonString) : jsonString;

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too.
    if (
      json &&
      typeof json === 'object'
    ) {
      return json;
    }
  } catch (e) {
    return false;
  }
  return false;
};

module.exports = isJSON;
