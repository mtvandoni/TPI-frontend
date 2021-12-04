/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './App.css';

import Header from './components/header/Header';
import Login from './pages/login/Login';
import session from './services/session';

const App = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    setUser(session().data);
  },[]);

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
