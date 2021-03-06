import updateTaskParameters from './update-task-parameters.js';

describe('Update task id for archive', () => {
  it('should update an existing task ID', () => {
    const data = {
      settings: { fillColor: 'blue' },
      parameters: {
        otherField: 'value',
        taskID: 'abc',
      },
    };
    const expected = {
      settings: { fillColor: 'blue' },
      parameters: {
        otherField: 'value',
        taskID: 'archive',
      },
    };
    expect(updateTaskParameters(data)).toEqual(expected);
  });

  it('should update missing parameters field', () => {
    const data = {
      settings: { fillColor: 'blue' },
    };
    const expected = {
      settings: { fillColor: 'blue' },
      parameters: {
        taskID: 'archive',
      },
    };
    expect(updateTaskParameters(data)).toEqual(expected);
  });
});
