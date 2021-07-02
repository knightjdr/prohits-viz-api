const scripts = {
  pvconvert: fields => `pvconvert --file="${fields.files[0]}" --imageType="${fields.imageType}"`,
  saintfea: fields => 'docker run -v $(pwd):/files/ pvutilitiespython /app/saint_fea.py '
    + `-f ${fields.fdr} -s ${fields.files[0]} -t ${fields.topPreys}`,
  saintstats: fields => 'docker run -v $(pwd):/files/ pvutilitiespython /app/saint_stats.py '
    + `-f ${fields.fdr} -s ${fields.files[0]}`,
};

const createCommand = fields => scripts[fields.utility](fields);

export default createCommand;
