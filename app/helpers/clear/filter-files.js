import readJSON from '../../utils/read-json.js';

const filterFilesToIgnore = async (files, directoryInfo) => {
  const { dir, ignoreFolders, whiteList } = directoryInfo;
  const foldersToIgnore = ignoreFolders.map(folder => new RegExp(`^${dir}${folder}`));

  const whiteListLookup = {};
  if (whiteList) {
    const whiteListPath = `${dir}${whiteList}`;
    const listOfFilenames = await readJSON(whiteListPath);

    whiteListLookup[whiteListPath] = true;
    listOfFilenames.forEach((filename) => {
      whiteListLookup[`${dir}${filename}`] = true;
    });
  }

  return files.filter(file => (
    !foldersToIgnore.some(re => re.test(file)) &&
    !whiteListLookup[file]
  ));
};

export default filterFilesToIgnore;
