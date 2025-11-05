import React, { useState } from 'react';
import { useAuth } from './useAuth.jsx'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const result = await login(username, password);

      if (result.token) {
        navigate('/'); // Success! Go home
      } else {
        setError(result.message || 'An unknown error occurred.');
      }
    } catch (err) {
      setError(err.message || 'Failed to log in. Please try again.');
    }
  };

  return (
    // --- CORRECTED ---
    // Use the "login-page-background" class for centering
    <div className="login-page-background">
      
      {/* This is the styled white box */}
      <div className="login-container">
        
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          
          {/* We need a style for this error */
           !error && <p className="login-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., john.doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;