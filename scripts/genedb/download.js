/* eslint-disable max-len */
import createFolder from '../utils/create-folder.js';
import downloadFtp from '../utils/download-ftp.js';
import downloadHttps from '../utils/download-https.js';
import unzipFile from '../utils/unzip-file.js';

const fsConfig = {
  hgnc: {
    file: './downloads/hgnc.json',
    httpOptions: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    url: 'https://rest.genenames.org/fetch/status/Approved',
  },
  uniprot: {
    file: './downloads/uniprot.tab',
    host: 'ftp.uniprot.org',
    hostFile: '/pub/databases/uniprot/current_release/knowledgebase/idmapping/by_organism/HUMAN_9606_idmapping_selected.tab.gz',
    zipFile: './downloads/uniprot.gz',
  },
};

const download = async () => {
  await createFolder('./downloads');
  await Promise.all([
    downloadHttps(fsConfig.hgnc.url, fsConfig.hgnc.file, fsConfig.hgnc.httpOptions),
    downloadFtp(fsConfig.uniprot.host, fsConfig.uniprot.hostFile, fsConfig.uniprot.zipFile),
  ]);
  await unzipFile('gunzip', fsConfig.uniprot.zipFile, fsConfig.uniprot.file);
};

export default download;
