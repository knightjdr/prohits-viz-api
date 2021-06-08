import downloadFile from '../utils/download-ftp.js';
import fetchJSON from '../utils/fetch-json.js';
import getDate from '../utils/get-date.js';

export const getHGNCVersion = async (url) => {
  const info = await fetchJSON(url, { Accept: 'application/json' });
  return getDate(info.lastModified);
};

export const getUniprotVersion = async (host, file) => {
  const parseVersionFromText = (str) => {
    const re = new RegExp(/UniProt Release (\d+_\d+)/);
    return str.match(re)[1];
  };

  const relNotes = await downloadFile(host, file);
  return parseVersionFromText(relNotes);
};

const getVersions = async () => {
  const HgncVersion = await getHGNCVersion('http://rest.genenames.org/info');
  const UniprotVersion = await getUniprotVersion(
    'ftp.uniprot.org',
    '/pub/databases/uniprot/current_release/relnotes.txt',
  );
  return {
    hgnc: HgncVersion,
    uniprot: UniprotVersion,
  };
};

export default getVersions;
