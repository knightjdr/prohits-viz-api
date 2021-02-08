import downloadHttps from '../../utils/download-https.js';
import unzipFile from '../../utils/unzip-file.js';

const fsConfig = {
  cell: {
    file: './downloads/rna-cells.tsv',
    url: 'https://www.proteinatlas.org/download/rna_celline.tsv.zip',
    zipFile: './downloads/rna-cells.zip',
  },
  tissue: {
    file: './downloads/rna-tissues.tsv',
    url: 'https://www.proteinatlas.org/download/rna_tissue.tsv.zip',
    zipFile: './downloads/rna-tissues.zip',
  },
};

/* Download and unzip expression data from HPA. */
const downloadRNAExpression = async () => {
  await Promise.all([
    downloadHttps(fsConfig.cell.url, fsConfig.cell.zipFile),
    downloadHttps(fsConfig.tissue.url, fsConfig.tissue.zipFile),
  ]);
  await Promise.all([
    unzipFile('unzip', fsConfig.cell.zipFile, fsConfig.cell.file),
    unzipFile('unzip', fsConfig.tissue.zipFile, fsConfig.tissue.file),
  ]);
};

export default downloadRNAExpression;
