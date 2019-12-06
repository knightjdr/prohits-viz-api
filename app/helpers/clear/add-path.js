const addPath = (config, files) => ([
  ...files[0].map(file => `${config.workDir}${file}`),
  ...files[1].map(file => `${config.upload}${file}`),
]);

export default addPath;
