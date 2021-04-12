import readJSON from '../../app/utils/read-json.js';

const getFieldAsArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  return [];
};

const parseHGNC = async (file) => {
  const geneIDs = {};

  const data = await readJSON(file);
  data.response.docs.forEach((doc) => {
    const {
      alias_symbol: aliasSymbol,
      ensembl_gene_id: ensemblg,
      entrez_id: entrez,
      hgnc_id: hgnc,
      prev_symbol: prevSymbol,
      refseq_accession: refseqg,
      symbol,
      uniprot_ids: uniprotacc,
    } = doc;

    const numericalID = hgnc.split(':')[1];

    geneIDs[numericalID] = {
      aliasSymbol: getFieldAsArray(aliasSymbol),
      ensemblg: ensemblg || '',
      entrez: entrez || '',
      prevSymbol: getFieldAsArray(prevSymbol),
      refseqg: getFieldAsArray(refseqg),
      symbol: symbol || '',
      uniprotacc: getFieldAsArray(uniprotacc),
    };
  });

  return geneIDs;
};

export default parseHGNC;
