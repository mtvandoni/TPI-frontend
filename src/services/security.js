// const session = require('./session');
import session from './session';
const axios = require('axios');

const apiURL = 'https://localhost:44311'; // 'http://webtpi-001-site1.dtempurl.com';
const headers = { 
  'Content-type': 'application/json; charset=iso-8859-1',
  'Access-Control-Allow-Origin': '*',
};

export const login = (email, password) => axios.post(apiURL + '/api/usuario/authenticate', {
  emailUnlam: email,
  password: password
}).then((response) => {
 // console.log('response de security', response);
  session.login(email, response.data);

  return response.data;
}).catch((error) => {
  if (error.response) {
    return Promise.reject(error.response.data.error);
  }
  return Promise.reject(error.message);
});

export const logout = () => session.logout();

