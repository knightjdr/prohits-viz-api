const parseIfJSON = (jsonString) => {
  try {
    const json = JSON.parse(jsonString);
    return json && typeof json === 'object' ? json : false;
  } catch (e) {
    return false;
  }
};

export default parseIfJSON;
