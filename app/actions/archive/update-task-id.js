const updateTaskID = data => ({
  ...data,
  parameters: data.parameters
    ? {
      ...data.parameters,
      taskID: 'archive',
    }
    : { taskID: 'archive' },
});

export default updateTaskID;
