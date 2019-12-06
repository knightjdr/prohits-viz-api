import emitAction from './emit-action.js';
import fetch from '../../../utils/fetch.js';
import validateGprofilerOptions from './validation/validate.js';

const url = 'https://biit.cs.ut.ee/gprofiler/api/gost/profile/';

const gprofiler = async (req, res) => {
  const { socket } = res.locals;
  try {
    const validatedData = validateGprofilerOptions(req.body);
    const fetchOptions = {
      data: validatedData,
      method: 'POST',
    };
    const response = await fetch(url, fetchOptions);
    emitAction(socket, req.body.analysisName, null, response);
  } catch (error) {
    emitAction(socket, req.body.analysisName, error);
  }
  res.end();
};

export default gprofiler;
