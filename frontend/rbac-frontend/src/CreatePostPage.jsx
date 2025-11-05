import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth.jsx'; 

const CreatePostPage = () => {
  const { api } = useAuth(); // This is correct
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This API path '/posts' is correct
      await api.post('/posts', { title, content });
      navigate('/'); // Go home to see the new post
    } catch (err) {
      console.error('Create post failed:', err);
      setError(err.response?.data?.message || 'Failed to create post.');
    }
  };

  return (
    // --- STYLING APPLIED ---
    <div className="post-form-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Use the standard error class */}
        {error && <p className="login-error">{error}</p>}
        
        {/* Use the standard form-group class */}
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input 
            type="text"
            id="title" // Added for label
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        
        {/* Use the standard form-group class */}
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea 
            id="content" // Added for label
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            rows="10"
            required 
          />
        </div>
        
        {/* Use the standard button class */}
        <button type="submit" className="login-button">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;