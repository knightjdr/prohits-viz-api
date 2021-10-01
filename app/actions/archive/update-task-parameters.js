const updateTaskParameters = (data, filename) => ({
  ...data,
  parameters: data.parameters
    ? {
        ...data.parameters,
        filename,
        taskID: 'archive',
      }
    : {
        filename,
        taskID: 'archive',
      },
});

export default updateTaskParameters;
