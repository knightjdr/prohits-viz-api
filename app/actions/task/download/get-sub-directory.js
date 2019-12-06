const getSubDirectory = (filename) => {
  switch (filename) {
    case 'error':
      return {
        file: 'error.txt',
        subDirectory: '',
      };
    case 'log':
      return {
        file: 'log.txt',
        subDirectory: '',
      };
    default:
      return {
        file: `${filename}.json`,
        subDirectory: '/interactive',
      };
  }
};

export default getSubDirectory;
