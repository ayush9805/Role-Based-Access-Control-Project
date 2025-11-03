import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';

// --- Page Components ---
import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import HomePage from './HomePage.jsx';
import AdminPage from './AdminPage.jsx';
import CreatePostPage from './CreatePostPage.jsx';

function App() {
  return (
    <>
      <Header />
      <div className="content-container">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />

          {/* --- Protected Route for Admin Only --- */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          {/* --- Protected Route for Editor & Admin --- */}
          <Route element={<ProtectedRoute allowedRoles={['Editor', 'Admin']} />}>
            <Route path="/create-post" element={<CreatePostPage />} />
          </Route>

          {/* --- Catch-all / Not Found --- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;