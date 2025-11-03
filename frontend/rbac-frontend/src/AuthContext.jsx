import React, { useState, useEffect } from 'react'; // <-- 'createContext' removed
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './context.jsx'; // Import the context

// 1. Create an Axios Instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// 2. Set up Axios interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 3. Export the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Check for user on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ _id: decoded.id, role: decoded.role });
        setToken(token);
      } catch (error) {
        console.error("Failed to decode token on load:", error);
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
      }
    }
    setLoading(false);
  }, []);

  // Login Function
  const login = async (username, password) => {
    try {
      const { data } = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      const decoded = jwtDecode(data.token);
      setUser({ _id: decoded.id, role: decoded.role });
      return data; // Success
    } catch (error) {
      return error.response.data; // Return error message
    }
  };

  // Register Function
  const register = async (username, password, role) => {
    try {
      const { data } = await api.post('/auth/register', { username, password, role });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      const decoded = jwtDecode(data.token);
      setUser({ _id: decoded.id, role: decoded.role });
      return data; // Success
    } catch (error) {
      return error.response.data; // Return error message
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    register,
    loading,
    api,
  };

  if (loading) {
    return <div>Loading app...</div>;
  }

  // Use the imported AuthContext here
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};