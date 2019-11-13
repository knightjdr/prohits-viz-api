const fetch = require('../../helpers/fetch');
const validateGprofiler = require('./validate');

const url = 'https://biit.cs.ut.ee/gprofiler/api/gost/profile/';

const go = async (req, res) => {
  const { socket } = res.locals;
  try {
    const validatedData = validateGprofiler(req.body);
    const fetchOptions = {
      data: validatedData,
      method: 'POST',
    };
    const response = await fetch(url, fetchOptions);
    const action = {
      analysis: {
        data: response.data.result,
        isProcessing: false,
      },
      name: req.body.analysisName,
      type: 'UPDATE_ANALYSIS',
    };
    socket.emit('action', action);
    res.end();
  } catch (error) {
    const action = {
      analysis: {
        didError: true,
        message: 'There was an error processing the request',
        processing: false,
      },
      name: req.body.analysisName,
      type: 'UPDATE_ANALYSIS',
    };
    socket.emit('action', action);
  }
};

module.exports = go;
