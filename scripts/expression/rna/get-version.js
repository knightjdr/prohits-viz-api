import fetchText from '../../utils/fetch-text.js';

const getHPAVersion = async (url) => {
  const parseVersionFromFirstLink = (str) => {
    const re = new RegExp(/The data files represented here includes data available in the Human Protein Atlas version (\d+.\d+)/);
    return str.match(re)[1];
  };

  const html = await fetchText(url);
  return parseVersionFromFirstLink(html);
};

export default getHPAVersion;
