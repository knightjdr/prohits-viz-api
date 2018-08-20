const fetch = require('isomorphic-fetch');

const parseText = require('./parse-text');
const ConvertToForm = require('../to-form');
const { validateGo } = require('./validate');

// Peform GO analysis.
const go = (socket, body) => (
  new Promise((resolve) => {
    const validatedForm = ConvertToForm(validateGo(body));

    const url = 'https://biit.cs.ut.ee/gprofiler/index.cgi';
    fetch(url, {
      body: validatedForm,
      headers: {
        Accept: 'text/plain',
      },
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => (
        response.text()
      ))
      .then((data) => {
        socket.emit(
          'action',
          {
            analysisType: 'go',
            results: parseText(data),
            type: 'SET_VIZ_ANALYSIS_RESULTS',
          },
        );
      })
      .catch(() => {
        socket.emit('action', { analysisType: 'go', type: 'VIZ_ANALYSIS_ERROR' });
      });

    resolve({ status: 200 });
  })
);

module.exports = go;
