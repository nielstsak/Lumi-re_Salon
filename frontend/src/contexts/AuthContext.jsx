import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  const verifyToken = useCallback(async (storedToken) => {
    try {
      apiClient.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
      const data = await apiClient.get('/users/me/');
      setUser({ username: data.username });
      setToken(storedToken);
    } catch (error) {
      localStorage.removeItem('authToken');
      setUser(null);
      setToken(null);
      delete apiClient.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      verifyToken(storedToken);
    } else {
      setLoading(false);
    }
  }, [verifyToken]);

  const login = async (username, password) => {
    try {
      const response = await apiClient.post('http://localhost:8000/api-token-auth/', { username, password });
      
      const receivedToken = response.token;
      if (receivedToken) {
        localStorage.setItem('authToken', receivedToken);
        apiClient.defaults.headers.common['Authorization'] = `Token ${receivedToken}`;
        setToken(receivedToken);
        setUser({ username });
        return true;
      }
      return false;
    } catch (error) {
      localStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
      delete apiClient.defaults.headers.common['Authorization'];
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    delete apiClient.defaults.headers.common['Authorization'];
  };

  const value = { user, token, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};