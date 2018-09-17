/* global fetch */

require('isomorphic-fetch');

const parseText = require('./parse-text');
const convertToForm = require('../convert-to-form');
const { validateGo } = require('./validate');

const go = (req, res) => (
  new Promise((resolve) => {
    const { socket } = res.locals;
    const validatedForm = convertToForm(validateGo(req.body));

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
      .then(text => (
        parseText(text)
      ))
      .then((data) => {
        socket.emit(
          'action',
          {
            analysisType: 'go',
            results: data,
            type: 'SET_VIZ_ANALYSIS_RESULTS',
          },
        );
      })
      .catch(() => {
        socket.emit('action', { analysisType: 'go', type: 'VIZ_ANALYSIS_ERROR' });
      });

    res.end();
    resolve();
  })
);

module.exports = go;
