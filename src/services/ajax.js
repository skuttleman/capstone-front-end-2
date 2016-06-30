import axios from 'axios';

axios.interceptors.request.use(config => {
  let token = localStorage.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const ajax = axios;

export const ajaxPattern = ({ method, url, before, succeed, fail, data }) => {
  method = method || 'get';
  return dispatch => {
    dispatch(before());
    return ajax[method](url, data).then(response => {
      console.log(`success: ${method} - ${url}:`, response)
      dispatch(succeed(response));
    }).catch(error => {
      // console.log(`failure: ${method} - ${url}:`, error)
      dispatch(fail(error));
    });
  };
};
