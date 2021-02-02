import store from '../store';
import { Handler } from '../handlers/types';
import { getIdFromPathName, getPathName } from '../helpers';

const _delete: Handler = async (request, response) => {
  const id = getIdFromPathName(getPathName(request));

  store.delete(id);
  response.end();
};

export default _delete;
