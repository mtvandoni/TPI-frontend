/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './App.css';

import Header from './components/header/Header';
import Login from './pages/login/Login';
import RecuperarPass from './pages/recuperarPass/RecuperarPass';
import session from './services/session';

const App = () => {
  const [user, setUser] = React.useState(null);
  const [recover, setRecover] = React.useState(null);

  React.useEffect(() => {
    setUser(session().data);
    if (window.location.pathname === '/recuperarPass') {
      setRecover(true);
    }
  },[]);

  return (
    <div>
      <Header />
      {!user && !recover ?
        <Login /> 
        : ''
      }
    </div>
  );
}

export default App;
