const extract = require('extract-zip');

const unzipFolder = async (zip, dest) => {
  await extract(zip, { dir: dest });
};

module.exports = unzipFolder;
