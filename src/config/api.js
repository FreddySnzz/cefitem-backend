const axios = require('axios');
const url_da_api = 'https://servicodados.ibge.gov.br/api/v1/';

axios.defaults.baseURL = `${url_da_api}`;

axios.interceptors.request.use(
  request => {
    const headers = {
      locale: 'pt-br',
      accept: '/',
      'Content-Type': 'application/json',
    };

    // switch(request.url) {
    //   case '/user':
    //     headers.accept = '/';
    //     headers.ContentType = 'multipart/form-data';
    //     break
    //   case '/article':
    //     headers.accept = '/';
    //     headers.ContentType = 'multipart/form-data';
    //     break
    //   case '/event':
    //     headers.accept = '/';
    //     headers.ContentType = 'multipart/form-data';
    //     break
    // }

    if (request.url.includes('files')) {
      headers.accept = '/'
      headers.ContentType = 'multipart/form-data'
    }

    request.headers = headers;
    return request;
  },
  err => {
    Promise.reject(err);
});
  

module.exports = axios;