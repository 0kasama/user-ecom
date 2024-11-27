'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    setAccessToken(token);
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    Cookies.set('accessToken', token);
    setAccessToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('accessToken');
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);