import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // You will need to install this: npm install jwt-decode

// --- 1. Create an Axios Instance ---
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Point to your backend
});

// --- 2. Set up Axios interceptor to add the token to headers ---
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// --- 3. Create the Context ---
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true); // For initial auth check

  // --- 4. Check for user on initial load ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          _id: decoded.id,
          role: decoded.role,
        });
        setToken(token);
      } catch (error) {
        // Invalid token
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
      }
    }
    setLoading(false);
  }, []);

  // --- 5. Real Login Function ---
  const login = async (username, password) => {
    try {
      const { data } = await api.post('/auth/login', { username, password });
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      
      const decoded = jwtDecode(data.token);
      setUser({
        _id: decoded.id,
        role: decoded.role,
      });
      
      return data; // Success
    } catch (error) {
      return error.response.data; // Return error message
    }
  };

  // --- 6. Real Register Function ---
  // We will use this to create our 'Viewer', 'Editor', 'Admin' seed users
  const register = async (username, password, role) => {
    try {
      const { data } = await api.post('/auth/register', { username, password, role });
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      
      const decoded = jwtDecode(data.token);
      setUser({
        _id: decoded.id,
        role: decoded.role,
      });

      return data; // Success
    } catch (error) {
      return error.response.data; // Return error message
    }
  };

  // --- 7. Logout Function ---
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
    register, // We'll use this to create our test users
    loading,
  };

  if (loading) {
    return <div>Loading app...</div>; // Or a spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- 8. The Custom Hook ---
export const useAuth = () => {
  return useContext(AuthContext);
};