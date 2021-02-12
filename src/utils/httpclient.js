import storage from './storage';
import axios from 'axios';
import apiConfig from '../config/api';
import {compile} from 'path-to-regexp';

axios.interceptors.request.use((config) => {
  return config;
});

const execute = async (
  path,
  method = 'GET',
  {params = {}, queries = {}, payloads = {}, headers = {}} = {},
) => {
  let user = await storage.get('user');
  let defaultlang = await storage.get('defaultlang');

  user = JSON.parse(user);
  const compiler = compile(path);
  var base = apiConfig.apiBaseUrl.replace(/~\/$/, '');
  const url = compiler(params || {});
  if (user && user.data && user.data.token) {
    headers.Authorization = `Token ${user.data.token}`;
  }

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // if ( ! headers['Accept']) {
  //   headers['Accept'] = 'application/json';
  // }

  let options = {method, headers};

  if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    options.data = payloads;
  }

  if (queries) {
    options.params = queries;
  }

  options.url = `/${String(defaultlang).toLowerCase()}/${
    apiConfig.prefixurl
  }/${url}`;
  options.baseURL = base;
  console.log(JSON.stringify(options));
  return await axios(options);
};

const dynamic = async (
  path,
  method = 'GET',
  {params = {}, queries = {}, obj = {}, headers = {}} = {},
) => {
  let user = await storage.get('user');
  let defaultlang = await storage.get('defaultlang');

  user = JSON.parse(user);
  const compiler = compile(path);
  var base = apiConfig.apiBaseUrl.replace(/~\/$/, '');
  const url = compiler(params || {});
  if (user && user.data && user.data.token) {
    headers.Authorization = `Token ${user.data.token}`;
  }

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // if ( ! headers['Accept']) {
  //   headers['Accept'] = 'application/json';
  // }

  let options = {method, headers};

  if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    options.data = obj;
  }

  if (queries) {
    options.params = queries;
  }
  options.url = `/${String(defaultlang).toLowerCase()}/${
    apiConfig.prefixurl
  }/${url}`;
  options.baseURL = base;
  console.log(JSON.stringify(options));
  return await axios(options);
};

const parellelexecute = async (
  path,
  method = 'GET',
  {params = {}, queries = {}, payloads = {}, headers = {}} = {},
) => {
  let request = [];
  for (let index = 0; index < path.length; index++) {
    let user = await storage.get('user');
    let defaultlang = await storage.get('defaultlang');

    user = JSON.parse(user);
    const compiler = compile(path[index]);
    var base = apiConfig.apiBaseUrl.replace(/~\/$/, '');
    const url = compiler(params || {});
    if (user && user.data && user.data.token) {
      headers.Authorization = `Token ${user.data.token}`;
    }
    headers['Content-Type'] = 'application/json';

    let options = {method, headers};

    if (queries) {
      options.params = queries;
    }

    options.url = `/${String(defaultlang).toLowerCase()}/${
      apiConfig.prefixurl
    }/${url}`;
    options.baseURL = base;
    request.push(axios.get(options));
  }
  return axios
    .all(request)
    .then(
      axios.spread((...responses) => {
        return responses;
      }),
    )
    .catch((errors) => {
      return errors;
    });
};

export default {
  get: (path, options) => execute(path, 'GET', options),
  post: (path, options) => execute(path, 'POST', options),
  put: (path, options) => execute(path, 'PUT', options),
  patch: (path, options) => execute(path, 'PATCH', options),
  parellel: (path, options) => parellelexecute(path, 'GET', options),
  delete: (path, options) => execute(path, 'DELETE', options),
  dynamic: (path, options) => dynamic(path, 'POST', options),
};
