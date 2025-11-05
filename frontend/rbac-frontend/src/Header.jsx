import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './useAuth.jsx';

const Header = () => {
  const { user, logout } = useAuth(); 

  return (
    <header className="app-header">
      {/* 1. Logo (Left) */}
      <div className="header-logo">
        <NavLink to="/">RBAC Project</NavLink>
      </div>

      {/* 2. Middle Links */}
      <nav className="header-middle-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>

        {/* --- RBAC LOGIC (FIXED) --- */}

        {/* Check for capitalized 'Admin' and 'Editor' */}
        {(user?.role === 'Admin' || user?.role === 'Editor') && (
          <NavLink to="/create-post">Create Post</NavLink>
        )}

        {/* Check for capitalized 'Admin' */}
        {user?.role === 'Admin' && (
          <NavLink to="/admin">Admin Panel</NavLink>
        )}
        
        {/* --- END OF FIX --- */}
      </nav>

      {/* 3. Auth Section (Right) */}
      <div className="header-auth-section">
        {user ? (
          <>
            <span className="role-tag">(Role: {user.role})</span>
            <button onClick={logout} className="header-auth-button">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="header-auth-button">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;