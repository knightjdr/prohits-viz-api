import fs from 'fs/promises';

import sortArray from '../utils/sort-array-strings.js';
import removeDuplicates from '../../app/utils/remove-duplicates.js';

const parseEnsemblG = (hgnc, uniprot) => {
  const merged = [
    ...(Array.isArray(hgnc) ? hgnc : []),
    ...(Array.isArray(uniprot) ? uniprot : []),
  ];
  const deduped = removeDuplicates(merged);
  sortArray(deduped);
  return deduped;
};

const parseEnsemblP = (values) => {
  if (Array.isArray(values)) {
    const deduped = removeDuplicates(values);
    sortArray(deduped);
    return deduped;
  }

  return [];
};

const parseRefseqG = (values) => {
  if (Array.isArray(values)) {
    const filtered = values.filter(value => value.startsWith('NM'));
    const withoutVersion = filtered.map(value => value.split('.')[0]);
    const deduped = removeDuplicates(withoutVersion);
    sortArray(deduped);
    return deduped;
  }

  return [];
};

const parseRefseqP = (values) => {
  if (Array.isArray(values)) {
    const filtered = values.filter(value => value.startsWith('NP'));
    const withoutVersion = filtered.map(value => value.split('.')[0]);
    const deduped = removeDuplicates(withoutVersion);
    sortArray(deduped);
    return deduped;
  }

  return [];
};

const parseUniprotAcc = (hgnc, uniprot) => {
  const merged = [
    ...(Array.isArray(hgnc) ? hgnc : []),
    ...(Array.isArray(uniprot) ? uniprot : []),
  ];
  const deduped = removeDuplicates(merged);
  sortArray(deduped);
  return deduped;
};

const parseUniprotID = (values) => {
  if (Array.isArray(values)) {
    const deduped = removeDuplicates(values);
    sortArray(deduped);
    return deduped;
  }

  return [];
};

const writeData = async (data, outfile) => {
  const { hgnc, uniprot } = data;
  const entrezIDs = removeDuplicates([...Object.keys(hgnc), ...Object.keys(uniprot)]);

  const merged = {};
  entrezIDs.forEach((id) => {
    merged[id] = {
      ensemblg: parseEnsemblG(hgnc[id]?.ensemblg, uniprot[id]?.ensemblg),
      ensemblp: parseEnsemblP(uniprot[id]?.ensemblp),
      refseqg: parseRefseqG(hgnc[id]?.refseqg),
      refseqp: parseRefseqP(uniprot[id]?.refseqp),
      symbol: hgnc[id]?.symbol ? removeDuplicates(hgnc[id]?.symbol) : [],
      uniprotacc: parseUniprotAcc(hgnc[id]?.uniprotacc, uniprot[id]?.uniprotacc),
      uniprotid: parseUniprotID(uniprot[id]?.uniprotid),
    };
  });

  await fs.writeFile(outfile, JSON.stringify(merged));
};

export default writeData;
