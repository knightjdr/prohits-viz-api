const createFolder = require('../helpers/create-folder');
const downloadHttps = require('../helpers/download-https');
const unzipFile = require('../helpers/unzip-file');

const fsConfig = {
  cell: {
    file: './downloads/cells.tsv',
    url: 'https://www.proteinatlas.org/download/rna_celline.tsv.zip',
    zipFile: './downloads/cells.zip',
  },
  tissue: {
    file: './downloads/tissues.tsv',
    url: 'https://www.proteinatlas.org/download/rna_tissue.tsv.zip',
    zipFile: './downloads/tissues.zip',
  },
};

/* Download and unzip expression data from HPA. */
const interactions = () => (
  new Promise((resolve, reject) => {
    createFolder('./downloads')
      .then(() => Promise.all([
        downloadHttps(fsConfig.cell.url, fsConfig.cell.zipFile),
        downloadHttps(fsConfig.tissue.url, fsConfig.tissue.zipFile),
      ]))
      .then(() => Promise.all([
        unzipFile('unzip', fsConfig.cell.zipFile, fsConfig.cell.file),
        unzipFile('unzip', fsConfig.tissue.zipFile, fsConfig.tissue.file),
      ]))
      .then(() => { resolve(); })
      .catch((err) => {
        reject(err);
      });
  })
);

module.exports = interactions;
