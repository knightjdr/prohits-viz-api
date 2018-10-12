const addPath = (workDir, uploadDir, workFiles, uploadFiles) => ([
  ...workFiles.map(file => `${workDir}${file}`),
  ...uploadFiles.map(file => `${uploadDir}${file}`),
]);

module.exports = addPath;
