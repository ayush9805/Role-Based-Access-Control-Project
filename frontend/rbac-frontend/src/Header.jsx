import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './useAuth.jsx'; // <-- IMPORT UPDATED

const Header = () => {
  const { user, logout } = useAuth(); 

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">RBAC Project</Link>
      </div>
      <nav>
        {/* Visible to Editors and Admins */}
        {user && (user.role === 'Editor' || user.role === 'Admin') && (
          <Link to="/create-post">Create Post</Link>
        )}

        {/* Visible to Admins Only */}
        {user && user.role === 'Admin' && (
          <Link to="/admin">Admin Panel</Link>
        )}

        {/* Auth State */}
        {user ? (
          <>
            <span className="role-tag">(Role: {user.role})</span>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;