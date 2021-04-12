import fs from 'fs/promises';
import readJson from '../../app/utils/read-json.js';

const mapExpression = async (infile, outfile, geneData, field) => {
  const expression = await readJson(infile);

  const fieldToHGNC = {};
  Object.entries(geneData).forEach(([hgnc, ids]) => {
    (Array.isArray(ids[field]) ? ids[field] : [ids[field]]).forEach((id) => {
      fieldToHGNC[id] = hgnc;
    });
  });

  const mapped = {};
  Object.entries(expression).forEach(([id, data]) => {
    if (fieldToHGNC[id]) {
      mapped[fieldToHGNC[id]] = data;
    }
  });

  await fs.writeFile(outfile, JSON.stringify(mapped, null, 2));
};

export default mapExpression;
