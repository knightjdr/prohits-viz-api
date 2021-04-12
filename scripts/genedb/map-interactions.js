import fs from 'fs/promises';
import readJson from '../../app/utils/read-json.js';

const mapInteractions = async (infile, outfile, geneData) => {
  const interactions = await readJson(infile);

  const entrezToHgnc = {};
  Object.entries(geneData).forEach(([hgnc, ids]) => {
    entrezToHgnc[ids.entrez] = hgnc;
  });

  const mapped = {};
  Object.entries(interactions).forEach(([source, targets]) => {
    if (entrezToHgnc[source]) {
      mapped[entrezToHgnc[source]] = targets.reduce((accum, target) => {
        if (entrezToHgnc[target]) {
          return [
            ...accum,
            entrezToHgnc[target],
          ];
        }
        return accum;
      }, []);
    }
  });

  await fs.writeFile(outfile, JSON.stringify(mapped, null, 2));
};

export default mapInteractions;
