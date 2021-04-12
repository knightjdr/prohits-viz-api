const addPath = (parentDir, files) => (
  files.map(file => `${parentDir}${file}`)
);

export default addPath;
