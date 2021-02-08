import extract from 'extract-zip';

const unzipFolder = async (zip, dest) => {
  await extract(zip, { dir: dest });
};

export default unzipFolder;
