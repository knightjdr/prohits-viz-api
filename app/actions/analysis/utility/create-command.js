const scripts = {
  pvconvert: fields => `pvconvert --file="${fields.files[0]}" --imageType="${fields.imageType}"`,
  saint_domain_enrich: fields => 'docker run -v $(pwd):/files/ pvutilitiespython /app/saint_domain_enrich.py '
    + `-b ${fields.background} -f ${fields.fdr} -i ${fields.idType} -s ${fields.files[0]} -t ${fields.topPreys} `
    + `-d ${fields.domainFile} -g ${fields.geneFile}`,
  saint_fea: fields => 'docker run -v $(pwd):/files/ pvutilitiespython /app/saint_fea.py '
    + `-f ${fields.fdr} -s ${fields.files[0]} -t ${fields.topPreys}`,
  saint_stats: fields => 'docker run -v $(pwd):/files/ pvutilitiespython /app/saint_stats.py '
    + `-f ${fields.fdr} -s ${fields.files[0]}`,
};

const createCommand = fields => scripts[fields.utility](fields);

export default createCommand;
