const FormData = require('form-data');

const toForm = (obj) => {
  const form = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    form.append(key, value);
  });
  return form;
};

module.exports = toForm;
