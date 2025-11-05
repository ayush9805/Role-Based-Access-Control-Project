import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// --- IMPORT YOUR LAYOUT AND PAGES ---
import Header from './Header.jsx';
import ProtectedRoute from './ProtectedRoute.jsx'; 
import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import CreatePostPage from './CreatePostPage.jsx';
import EditPostPage from './EditPostPage.jsx';
import AdminPanelPage from './AdminPanelPage.jsx';
import AboutPage from './AboutPage.jsx';
import ContactPage from './ContactPage.jsx';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="content-container">
        <Outlet /> 
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<MainLayout />}>
        
        {/* Public routes */}
        <Route index element={<HomePage />} /> 
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} /> 
        
        {/* --- PROTECTED ROUTES (FIXED) --- */}

        {/* Use capitalized 'Admin' and 'Editor' */}
        <Route element={<ProtectedRoute allowedRoles={['Admin', 'Editor']} />}>
          <Route path="create-post" element={<CreatePostPage />} />
          <Route path="edit-post/:postId" element={<EditPostPage />} />
        </Route>
        
        {/* Use capitalized 'Admin' */}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="admin" element={<AdminPanelPage />} />
        </Route>
        
      </Route>
    </Routes>
  );
}

export default App;