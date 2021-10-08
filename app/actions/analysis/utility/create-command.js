const scripts = {
  crispr_convert: fields => 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
    + 'pvutilitiespython /app/crispr_convert/main.py '
    + `-f files -t ${fields.tool}`,
  pvconvert: fields => `pvconvert --file="${fields.files[0]}" --imageType="${fields.imageType}"`,
  saint_biogrid_network: fields => 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
    + 'pvutilitiespython /app/text_biogrid_network/main.py '
    + `-k ${fields.accessKey} -el "${fields.evidenceList.join('|')}" -f "${fields.files[0]}" `
    + `-fdr ${fields.fdr} -it symbol -ie ${fields.includeEvidence} `
    + `-ipi ${fields.includePrimaryInteractions} -isi ${fields.includeSecondaryInteractions} -isai ${fields.includeSaintInteractions} `
    + `-ise ${fields.interSpeciesExcluded} -is true -g "${fields.geneFile}" `
    + `-m ${fields.max} -tt ${fields.throughputTag}`,
  saint_domain_enrich: fields => 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
    + 'pvutilitiespython /app/saint_domain_enrich/main.py '
    + `-b ${fields.background} -f ${fields.fdr} -i ${fields.idType} -s "${fields.files[0]}" -t ${fields.topPreys} `
    + `-d "${fields.domainFile}" -g "${fields.geneFile}"`,
  saint_fea: fields => 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
    + 'pvutilitiespython /app/saint_fea/main.py '
    + `-f ${fields.fdr} -s "${fields.files[0]}" -t ${fields.topPreys}`,
  saint_specificity: fields => 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
    + 'pvutilitiespython /app/saint_specificity/main.py '
    + `-c ${fields.controlSubtract} -m ${fields.metric} -s "${fields.files[0]}"`,
  saint_stats: fields => 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
    + 'pvutilitiespython /app/saint_stats/main.py '
    + `-f ${fields.fdr} -s "${fields.files[0]}"`,
  text_biogrid_network: fields => 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
    + 'pvutilitiespython /app/text_biogrid_network/main.py '
    + `-k ${fields.accessKey} -el "${fields.evidenceList.join('|')}" -f "${fields.files[0]}" `
    + `-it ${fields.idType} -ie ${fields.includeEvidence} `
    + `-ipi ${fields.includePrimaryInteractions} -isi ${fields.includeSecondaryInteractions} `
    + `-ise ${fields.interSpeciesExcluded} -g "${fields.geneFile}" `
    + `-m ${fields.max} -tt ${fields.throughputTag}`,
  text_symbol_fix: fields => 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) '
    + 'pvutilitiespython /app/text_symbol_fix/main.py '
    + `-c "${fields.columns.join('|')}" -f "${fields.files[0]}"`,
};

const createCommand = fields => scripts[fields.utility](fields);

export default createCommand;
