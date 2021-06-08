/* eslint-disable max-len */
import createFolder from '../utils/create-folder.js';
import downloadFtp from '../utils/download-ftp-to-file.js';
import downloadHttps from '../utils/download-https-to-file.js';
import unzipFile from '../utils/unzip-file.js';

const configTemplate = {
  hgnc: {
    file: '%DOWNLOAD_FOLDER%hgnc.json',
    httpOptions: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    url: 'https://rest.genenames.org/fetch/status/Approved',
  },
  uniprot: {
    file: '%DOWNLOAD_FOLDER%uniprot.tab',
    host: 'ftp.uniprot.org',
    hostFile: '/pub/databases/uniprot/current_release/knowledgebase/idmapping/by_organism/HUMAN_9606_idmapping_selected.tab.gz',
    zipFile: '%DOWNLOAD_FOLDER%uniprot.gz',
  },
};

const populateConfigTemplate = downloadFolder => ({
  hgnc: {
    file: configTemplate.hgnc.file.replace('%DOWNLOAD_FOLDER%', downloadFolder),
    httpOptions: configTemplate.hgnc.httpOptions,
    url: configTemplate.hgnc.url,
  },
  uniprot: {
    file: configTemplate.uniprot.file.replace('%DOWNLOAD_FOLDER%', downloadFolder),
    host: configTemplate.uniprot.host,
    hostFile: configTemplate.uniprot.hostFile,
    zipFile: configTemplate.uniprot.zipFile.replace('%DOWNLOAD_FOLDER%', downloadFolder),
  },
});

const download = async (downloadFolder) => {
  await createFolder(downloadFolder);

  const config = populateConfigTemplate(downloadFolder);

  await Promise.all([
    downloadHttps(config.hgnc.url, config.hgnc.file, config.hgnc.httpOptions),
    downloadFtp(config.uniprot.host, config.uniprot.hostFile, config.uniprot.zipFile),
  ]);
  await unzipFile('gunzip', config.uniprot.zipFile, config.uniprot.file);
};

export default download;
