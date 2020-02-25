import formatResponse from './format-response/format-response.js';

const emitAction = (socket, analysisName, error, response) => {
  const action = {
    analysis: {
      data: response && formatResponse(response),
      didError: Boolean(error),
      isProcessing: false,
      message: error ? 'There was an error performing the analysi' : '',
    },
    name: analysisName,
    type: 'UPDATE_ANALYSIS',
  };
  socket.emit('action', action);
};

export default emitAction;
