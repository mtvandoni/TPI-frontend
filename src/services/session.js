import Cookies from 'universal-cookie';

// const Cookies = require('universal-cookie').default;


const session = () => {
  const cookies = new Cookies();
  
  const sess = cookies.get('X-Token');

  return sess || {};
}

session.login = (user, data) => {
 // console.log('session login', user, data)
  const cookies = new Cookies ();
  cookies.set('X-Token', {
    token: data.token,
    data: data,                                  
    user,
    usuario: data
  });
};

session.data = () => {
  const cookies = new Cookies();
  return cookies.get('X-Token');
};

session.logout = () => {
  const cookies = new Cookies();
  cookies.set('X-Token', {token: null, data: null, user: null});
}

export default session;




/* import axios from 'axios';

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
export default login; */