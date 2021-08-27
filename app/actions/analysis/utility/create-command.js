const scripts = {
  crispr_convert: fields => 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) ' +
    'pvutilitiespython /app/crispr_convert/main.py ' +
    `-f files -t ${fields.tool}`,
  pvconvert: fields => `pvconvert --file="${fields.files[0]}" --imageType="${fields.imageType}"`,
  saint_domain_enrich: fields => 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) ' +
    'pvutilitiespython /app/saint_domain_enrich/main.py ' +
    `-b ${fields.background} -f ${fields.fdr} -i ${fields.idType} -s ${fields.files[0]} -t ${fields.topPreys} ` +
    `-d ${fields.domainFile} -g ${fields.geneFile}`,
  saint_fea: fields => 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) ' +
    'pvutilitiespython /app/saint_fea/main.py ' +
    `-f ${fields.fdr} -s ${fields.files[0]} -t ${fields.topPreys}`,
  saint_stats: fields => 'docker run --rm -v $(pwd):/files/ --user $(id -u):$(id -g) ' +
    'pvutilitiespython /app/saint_stats/main.py ' +
    `-f ${fields.fdr} -s ${fields.files[0]}`,
};

const createCommand = fields => scripts[fields.utility](fields);

export default createCommand;
