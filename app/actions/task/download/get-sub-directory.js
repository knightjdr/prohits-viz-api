const getSubDirectory = (filename) => {
  if (filename === 'error') {
    return {
      file: 'error.txt',
      subDirectory: '',
    };
  } if (filename === 'log') {
    return {
      file: 'log.txt',
      subDirectory: '',
    };
  }
  return {
    file: `${filename}.json`,
    subDirectory: '/interactive',
  };
};

export default getSubDirectory;
