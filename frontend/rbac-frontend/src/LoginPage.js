import React, { useState } from 'react';
import { useAuth } from './AuthContext';
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
    const result = await login(username, password);
    if (result.token) {
      navigate('/'); // Success! Go home.
    } else {
      setError(result.message); // e.g., "Invalid username or password"
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {/* You will need a way to register your seed users.
        You can build a small, separate register form
        or use Postman to hit your /api/auth/register endpoint.
        
        Example: POST to /api/auth/register with...
        { "username": "admin", "password": "123", "role": "Admin" }
        { "username": "editor", "password": "123", "role": "Editor" }
        { "username": "viewer", "password": "123", "role": "Viewer" }
      */}
    </div>
  );
};

export default LoginPage;