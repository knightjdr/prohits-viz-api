import emitAction from './emit-action';
import formatResponse from './format-response/format-response';

jest.mock('./format-response/format-response');

const socket = {
  emit: jest.fn(),
};

describe('Emit action for g:Profiler result', () => {
  it('should emit action when there is an error', () => {
    socket.emit.mockClear();
    const analysisName = 'analysis-test';
    const err = new Error('Test error');
    const expected = {
      analysis: {
        didError: true,
        isProcessing: false,
        message: 'There was an error performing the analysi',
      },
      name: analysisName,
      type: 'UPDATE_ANALYSIS',
    };

    emitAction(socket, analysisName, err);
    expect(socket.emit).toHaveBeenCalledWith('action', expected);
  });

  it('should emit action when there a response', () => {
    const formattedResponse = {
      results: [],
      unknownQueries: ['a'],
    };
    formatResponse.mockReturnValue(formattedResponse);
    socket.emit.mockClear();

    const analysisName = 'analysis-test';
    const expected = {
      analysis: {
        data: formattedResponse,
        didError: false,
        isProcessing: false,
        message: '',
      },
      name: analysisName,
      type: 'UPDATE_ANALYSIS',
    };

    emitAction(socket, analysisName, null, []);
    expect(socket.emit).toHaveBeenCalledWith('action', expected);
  });
});
