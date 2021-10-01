// Checks if a string or object is valid json. Set isString = false
// to check a JSON object. Return parsed JSON is valid, otherwise return
// false.

const isJSON = (json, isString = true) => {
  try {
    const parsedJSON = isString ? JSON.parse(json) : json;

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too.
    if (
      parsedJSON &&
      typeof parsedJSON === 'object'
    ) {
      return parsedJSON;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export default isJSON;
