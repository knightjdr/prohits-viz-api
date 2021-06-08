import fetchText from '../utils/fetch-text.js';
import listFTP from '../utils/list-ftp.js';

export const getBiogridVersion = async (url) => {
  const parseVersionFromFirstLink = (str) => {
    const re = new RegExp(/https:\/\/downloads.thebiogrid.org\/BioGRID\/Release-Archive\/BIOGRID-(\d+\.\d+\.\d+)/);
    return str.match(re)[1];
  };

  const html = await fetchText(url);
  return parseVersionFromFirstLink(html);
};

export const getIntactVersion = async (host, dir) => {
  const intactDirs = await listFTP(host, dir);

  const dateRe = new RegExp(/\d{4}-\d{2}-\d{2}/);
  const dateDirectories = intactDirs.filter(intactDir => intactDir.name && dateRe.test(intactDir.name));
  const versions = dateDirectories.map((dateDirectory => dateDirectory.name));
  const sortedVersions = versions.sort((a, b) => new Date(b) - new Date(a));
  return sortedVersions[0];
};

const getVersions = async () => {
  const BioGridVersion = await getBiogridVersion('https://downloads.thebiogrid.org/BioGRID/Release-Archive');
  const IntactVersion = await getIntactVersion('ftp.ebi.ac.uk', '/pub/databases/intact/');
  return {
    biogrid: BioGridVersion,
    intact: IntactVersion,
  };
};

export default getVersions;
