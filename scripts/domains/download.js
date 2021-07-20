import downloadFtp from '../utils/download-ftp-to-file.js';
import unzipFile from '../utils/unzip-file.js';

const configTemplate = {
  file: '%DOWNLOAD_FOLDER%domains.tsv',
  host: 'ftp.ebi.ac.uk',
  hostFile: 'pub/databases/Pfam/current_release/proteomes/9606.tsv.gz',
  zipFile: '%DOWNLOAD_FOLDER%domains.gz',
};

const populateConfigTemplate = downloadFolder => ({
  file: configTemplate.file.replace('%DOWNLOAD_FOLDER%', downloadFolder),
  host: configTemplate.host,
  hostFile: configTemplate.hostFile,
  zipFile: configTemplate.zipFile.replace('%DOWNLOAD_FOLDER%', downloadFolder),
});

const download = async (downloadFolder) => {
  const config = populateConfigTemplate(downloadFolder);

  await downloadFtp(config.host, config.hostFile, config.zipFile);
  await unzipFile('gunzip', config.zipFile, config.file);
  return config.file;
};

export default download;
