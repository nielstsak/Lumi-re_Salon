import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios'; // Ajout de l'import axios direct
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
      const response = await axios.post('https://lumi-re-salon.onrender.com/api-token-auth/', { username, password });
      const data = response.data;
      
      const receivedToken = data.token;
      if (receivedToken) {
        localStorage.setItem('authToken', receivedToken);
        apiClient.defaults.headers.common['Authorization'] = `Token ${receivedToken}`;
        setToken(receivedToken);
        try {
           const userData = await apiClient.get('/users/me/');
           setUser({ username: userData.username });
        } catch (userError) {
           console.error("Failed to fetch user data after login:", userError);
           setUser({ username });
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
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