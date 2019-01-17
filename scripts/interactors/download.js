const createFolder = require('../helpers/create-folder');
const downloadFtp = require('../helpers/download-ftp');
const downloadHttps = require('../helpers/download-https');
const unzipFile = require('../helpers/unzip-file');
const unzipFolder = require('../helpers/unzip-folder');

const fsConfig = {
  biogrid: {
    file: './downloads/biogrid.tab',
    url: 'https://downloads.thebiogrid.org/Download/BioGRID/Latest-Release/BIOGRID-ALL-LATEST.tab2.zip',
    zipFile: './downloads/biogrid.zip',
  },
  intact: {
    file: './downloads/intact.tab',
    host: 'ftp.ebi.ac.uk',
    hostFile: '/pub/databases/intact/current/psimitab/intact.zip',
    zipFile: './downloads/intact.zip',
  },
  taxonomy: {
    dest: `${__dirname}/downloads/taxonomy`,
    host: 'ftp.ncbi.nih.gov',
    hostFile: '/pub/taxonomy/taxdmp.zip',
    zipFile: './downloads/taxdmp.zip',
  },
};

/* Download and unzip interactions database from BioGrid and Intact. */
const interactions = () => (
  new Promise((resolve, reject) => {
    createFolder('./downloads')
      .then(() => Promise.all([
        downloadHttps(fsConfig.biogrid.url, fsConfig.biogrid.zipFile),
        downloadFtp(fsConfig.intact.host, fsConfig.intact.hostFile, fsConfig.intact.zipFile),
        downloadFtp(fsConfig.taxonomy.host, fsConfig.taxonomy.hostFile, fsConfig.taxonomy.zipFile),
      ]))
      .then(() => Promise.all([
        unzipFile('unzip', fsConfig.biogrid.zipFile, fsConfig.biogrid.file),
        unzipFile('unzip', fsConfig.intact.zipFile, fsConfig.intact.file),
        unzipFolder(fsConfig.taxonomy.zipFile, fsConfig.taxonomy.dest),
      ]))
      .then(() => { resolve(); })
      .catch((err) => {
        reject(err);
      });
  })
);

module.exports = interactions;
