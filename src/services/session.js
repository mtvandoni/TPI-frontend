import axios from 'axios';

const Session = () => {}

const apiURL = 'https://localhost:44311';

const login = (mail, pass) => {
  const obj = {
    nombre: mail,
    password: pass
  }
  axios.post(apiURL + '/api/usuario/authenticate', obj)
    .then(response => response.data)
    // .catch((error) => {
    //  if (error) {
    //    return null;
    //  }

    //  throw error.response;
    // });
}
export default login;