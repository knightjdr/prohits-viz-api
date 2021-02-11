import fs from 'fs/promises';

const filterFiles = (files, ext) => (
  ext ? files.filter(file => file.endsWith(ext)) : files
);

/* Get list of files in specified directory. If fileExt is specified,
** only files with that extension will be returned. */
const listFiles = async (dir, fileExt = '') => {
  try {
    const files = await fs.readdir(dir);
    return filterFiles(files, fileExt);
  } catch (error) {
    throw new Error(`Error listing ${dir} folder`);
  }
};

export default listFiles;
