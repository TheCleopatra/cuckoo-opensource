import React, { useEffect } from 'react';
import { HashRouter as Router, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import AppRoutes from './router';

const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        if (typeof chrome !== 'undefined' && chrome.storage) {
          // const { isAuthenticated, lastActiveTime } = await chrome.storage.local.get(['isAuthenticated', 'lastActiveTime']);

          // const currentTime = Date.now();
          // const inactiveTime = currentTime - (lastActiveTime || 0);
          // const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes

          navigate('/home');

          // if (isAuthenticated && inactiveTime < TIMEOUT_DURATION) {
          //   navigate('/home');
          // } else {
          //   navigate('/welcome-back');
          // }
        } else {
          console.warn('Chrome API is not available.');
          navigate('/');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/');
      }
    };

    checkAuthAndRedirect();
  }, []);

  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthRedirect />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
