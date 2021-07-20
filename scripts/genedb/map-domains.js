import fs from 'fs/promises';
import readJson from '../../app/utils/read-json.js';

const mapDomains = async (infile, outfile, geneData) => {
  const domains = await readJson(infile);

  const uniprotToHGNC = {};
  Object.entries(geneData).forEach(([hgnc, ids]) => {
    ids.uniprotacc.forEach((id) => {
      uniprotToHGNC[id] = hgnc;
    });
  });

  const mapped = {};
  Object.entries(domains).forEach(([id, data]) => {
    if (uniprotToHGNC[id]) {
      mapped[uniprotToHGNC[id]] = data;
    }
  });

  await fs.writeFile(outfile, JSON.stringify(mapped, null, 2));
};

export default mapDomains;
