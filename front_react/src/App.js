import './App.css';
import React, { useState, useEffect } from 'react';
import Index_header from './Components/AppHeader/Index_header';
import Index_side from './Components/SideMenu/Index_side';
import Index_page from './Components/PageContent/Index_page';
import Index_footer from './Components/AppFooter/Index_footer';
import Login from './pages/Page_login/Login';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem('authToken', token);
    navigate('/Dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    navigate('/');
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="App">
      <Index_header />
      {isLoggedIn ? (
        <div className='sideMenuandPagecontent'>
          <Index_side onLogout={handleLogout} />
          <Index_page />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <Index_footer />
    </div>
  );
}

export default App;
