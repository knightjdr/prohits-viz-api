import createFolder from '../utils/create-folder.js';
import downloadFtp from '../utils/download-ftp.js';
import downloadHttps from '../utils/download-https.js';
import unzipFile from '../utils/unzip-file.js';

const fsConfig = {
  biogrid: {
    file: './downloads/biogrid.tab',
    url: 'https://downloads.thebiogrid.org/Download/BioGRID/Latest-Release/BIOGRID-ALL-LATEST.tab3.zip',
    zipFile: './downloads/biogrid.zip',
  },
  intact: {
    file: './downloads/intact.tab',
    host: 'ftp.ebi.ac.uk',
    hostFile: '/pub/databases/intact/current/psimitab/intact.zip',
    zipFile: './downloads/intact.zip',
  },
};

/* Download and unzip interactions database from BioGrid and Intact. */
const download = async () => {
  await createFolder('./downloads');
  await Promise.all([
    downloadHttps(fsConfig.biogrid.url, fsConfig.biogrid.zipFile),
    downloadFtp(fsConfig.intact.host, fsConfig.intact.hostFile, fsConfig.intact.zipFile),
  ]);
  await Promise.all([
    unzipFile('unzip', fsConfig.biogrid.zipFile, fsConfig.biogrid.file),
    unzipFile('unzip', fsConfig.intact.zipFile, fsConfig.intact.file),
  ]);
};

export default download;
