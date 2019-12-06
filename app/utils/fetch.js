/* global fetch */

require('isomorphic-fetch');

const defaultOptions = {
  data: {},
  headers: {},
  method: 'GET',
};

const fillOptions = (options) => {
  const fetchOptions = Object.entries(defaultOptions).reduce((accum, [key, value]) => ({
    ...accum,
    [key]: options[key] || value,
  }), {});

  if (fetchOptions.method === 'POST') {
    fetchOptions.body = JSON.stringify(fetchOptions.data);
    fetchOptions.headers['Content-Type'] = 'application/json';
  }
  delete fetchOptions.data;

  if (Object.keys(fetchOptions.headers).length === 0) {
    delete fetchOptions.headers;
  }

  return fetchOptions;
};

const fetchWrapper = async (url, options = {}) => {
  try {
    const fetchOptions = fillOptions(options);
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return {
      data: json,
    };
  } catch (error) {
    return {
      error: true,
      message: error.toString(),
    };
  }
};

export default fetchWrapper;
