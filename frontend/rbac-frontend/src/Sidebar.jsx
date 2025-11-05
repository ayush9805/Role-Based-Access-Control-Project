import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './useAuth'; // Your existing auth hook

const Sidebar = () => {
  const { user, logout } = useAuth(); // Get the user and logout function

  return (
    <nav className="sidebar-nav">
      <h3>My Blog</h3>
      <div className="sidebar-links">
        <NavLink to="/">Home (All Posts)</NavLink>

        {/* RBAC: Show "Create Post" for 'admin' OR 'editor'
          The '?' is optional chaining, in case user is null
        */}
        {(user?.role === 'admin' || user?.role === 'editor') && (
          <NavLink to="/create-post">Create New Post</NavLink>
        )}

        {/* RBAC: Show "Admin Panel" for 'admin' ONLY
        */}
        {user?.role === 'admin' && (
          <NavLink to="/admin">Admin Panel</NavLink>
        )}
        
        {/* We can also add profile/logout links here */}
        {user ? (
          <button onClick={logout} className="sidebar-logout-btn">Logout</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;