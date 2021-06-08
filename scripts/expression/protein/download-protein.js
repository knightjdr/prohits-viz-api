import fetchStream from '../../utils/fetch-stream-to-file.js';

// eslint-disable-next-line max-len
const createURL = tissueCategory => `https://www.proteomicsdb.org/proteomicsdb/logic/api/proteinexpressionacrosstissues.xsodata/InputParams(QUANTIFICATION_METHOD='MS1',TISSUE_ID_SELECTION='',TISSUE_CATEGORY_SELECTION='${tissueCategory}',SCOPE_SELECTION=1,AGGREGATE=1,SEPARATOR=',',CALCULATION_METHOD='iBAQ',ONLY_SP=1,NO_ISOFORM=1,TISSUE_ORDER=0,PROTEIN_ORDER=0,TAXCODE=9606,OMICS='Proteomics')/Results?$select=UNIPROT_ACCESSION,EXPRESSION_LEVEL,TISSUE_NAME,NORMALIZED_INTENSITY&$format=json`;

/* Download and unzip expression data from HPA. */
const downloadRNAExpression = async (downloadFolder) => {
  await Promise.all([
    fetchStream(
      createURL('cell+line'),
      `${downloadFolder}protein-cells.json`,
    ),
    fetchStream(
      createURL('tissue'),
      `${downloadFolder}protein-tissues.json`,
    ),
  ]);
};

export default downloadRNAExpression;
