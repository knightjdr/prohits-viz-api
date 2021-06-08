import downloadHttps from '../../utils/download-https-to-file.js';
import unzipFile from '../../utils/unzip-file.js';

const configTemplate = {
  cell: {
    file: '%DOWNLOAD_FOLDER%rna-cells.tsv',
    url: 'https://www.proteinatlas.org/download/rna_celline.tsv.zip',
    zipFile: '%DOWNLOAD_FOLDER%rna-cells.zip',
  },
  tissue: {
    file: '%DOWNLOAD_FOLDER%rna-tissues.tsv',
    url: 'https://www.proteinatlas.org/download/rna_tissue.tsv.zip',
    zipFile: '%DOWNLOAD_FOLDER%rna-tissues.zip',
  },
};

const populateConfigTemplate = downloadFolder => ({
  cell: {
    file: configTemplate.cell.file.replace('%DOWNLOAD_FOLDER%', downloadFolder),
    url: configTemplate.cell.url,
    zipFile: configTemplate.cell.zipFile.replace('%DOWNLOAD_FOLDER%', downloadFolder),
  },
  tissue: {
    file: configTemplate.tissue.file.replace('%DOWNLOAD_FOLDER%', downloadFolder),
    url: configTemplate.tissue.url,
    zipFile: configTemplate.tissue.zipFile.replace('%DOWNLOAD_FOLDER%', downloadFolder),
  },
});

/* Download and unzip expression data from HPA. */
const downloadRNAExpression = async (downloadFolder) => {
  const config = populateConfigTemplate(downloadFolder);

  await Promise.all([
    downloadHttps(config.cell.url, config.cell.zipFile),
    downloadHttps(config.tissue.url, config.tissue.zipFile),
  ]);
  await Promise.all([
    unzipFile('unzip', config.cell.zipFile, config.cell.file),
    unzipFile('unzip', config.tissue.zipFile, config.tissue.file),
  ]);
};

export default downloadRNAExpression;
