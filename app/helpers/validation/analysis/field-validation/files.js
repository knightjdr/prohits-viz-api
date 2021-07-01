const validateFiles = files => (
  files && Array.isArray(files) && files.length > 0
    ? {}
    : {
      errors: {
        files: 'Missing file',
      },
    }
);

export default validateFiles;
