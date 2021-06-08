import createFolder from '../utils/create-folder.js';
import downloadFtp from '../utils/download-ftp-to-file.js';
import downloadHttps from '../utils/download-https-to-file.js';
import unzipFile from '../utils/unzip-file.js';

const configTemplate = {
  biogrid: {
    file: '%DOWNLOAD_FOLDER%biogrid.tab',
    url: 'https://downloads.thebiogrid.org/Download/BioGRID/Release-Archive/BIOGRID-%VERSION%/BIOGRID-ALL-%VERSION%.tab3.zip',
    zipFile: '%DOWNLOAD_FOLDER%biogrid.zip',
  },
  intact: {
    file: '%DOWNLOAD_FOLDER%intact.tab',
    host: 'ftp.ebi.ac.uk',
    hostFile: '/pub/databases/intact/%VERSION%/psimitab/intact.zip',
    zipFile: '%DOWNLOAD_FOLDER%intact.zip',
  },
};

const populateConfigTemplate = (downloadFolder, versions) => ({
  biogrid: {
    file: configTemplate.biogrid.file.replace('%DOWNLOAD_FOLDER%', downloadFolder),
    url: configTemplate.biogrid.url.replace(/%VERSION%/g, versions.biogrid),
    zipFile: configTemplate.biogrid.zipFile.replace('%DOWNLOAD_FOLDER%', downloadFolder),
  },
  intact: {
    file: configTemplate.intact.file.replace('%DOWNLOAD_FOLDER%', downloadFolder),
    host: configTemplate.intact.host,
    hostFile: configTemplate.intact.hostFile.replace(/%VERSION%/g, versions.intact),
    zipFile: configTemplate.intact.zipFile.replace('%DOWNLOAD_FOLDER%', downloadFolder),
  },
});

/* Download and unzip interactions database from BioGrid and Intact. */
const download = async (downloadFolder, versions) => {
  await createFolder(downloadFolder);

  const config = populateConfigTemplate(downloadFolder, versions);

  await Promise.all([
    downloadHttps(config.biogrid.url, config.biogrid.zipFile),
    downloadFtp(config.intact.host, config.intact.hostFile, config.intact.zipFile),
  ]);
  await Promise.all([
    unzipFile('unzip', config.biogrid.zipFile, config.biogrid.file),
    unzipFile('unzip', config.intact.zipFile, config.intact.file),
  ]);
};

export default download;
