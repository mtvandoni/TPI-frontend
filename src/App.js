/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './App.css';

import Header from './components/header/Header';
import Login from './pages/login/Login';

const App = () => {
  const auth = localStorage.getItem('auth');
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    setUser(JSON.parse(auth));
  },[]);
  
 /* React.useEffect(() => {
    fetch("https://localhost:44311/api/persona", {
      method: "GET",
      headers: {
          "Content-Type": "text/plain",

      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          console.log(error);
        }
    )
  }, []); */

  return (
    <div>
      <Header />
      {!user ?
        <Login /> 
        : ''
      }
    </div>
  );
}

export default App;
