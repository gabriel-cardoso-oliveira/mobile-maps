import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quantum-balm-274511.uc.r.appspot.com',
  // baseURL: 'http://10.0.2.2:3333',
});

export default api;
