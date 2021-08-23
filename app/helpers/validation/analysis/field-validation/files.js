const validateFiles = files => (
  files && Array.isArray(files) && files.length > 0
    ? {}
    : {
      errors: {
        files: 'missing file',
      },
    }
);

export default validateFiles;
