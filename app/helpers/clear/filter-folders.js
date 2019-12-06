import config from '../../config/config.js';

const filterOutFoldersToIgnore = files => (
  files.filter(file => (
    !config.ignore.some(re => RegExp(re).test(file))
  ))
);

export default filterOutFoldersToIgnore;
