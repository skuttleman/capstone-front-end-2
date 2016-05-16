import axios from 'axios';

axios.interceptors.request.use(config => {
  let token = localStorage.token;
  if (token) {
    config.headers.Authorization = ['Bearer', token].join(' ');
  }
  return config;
});

export default axios;
