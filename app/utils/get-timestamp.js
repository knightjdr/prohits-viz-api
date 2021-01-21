const defaultOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

const getTimestamp = (options = defaultOptions) => (
  (new Date()).toLocaleTimeString('en-CA', options)
);

export default getTimestamp;
