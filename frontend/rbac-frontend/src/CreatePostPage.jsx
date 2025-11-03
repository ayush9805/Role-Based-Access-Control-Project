import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth.jsx'; // <-- IMPORT UPDATED

const CreatePostPage = () => {
  const { api } = useAuth(); 
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/posts', { title, content });
      navigate('/'); // Go home to see the new post
    } catch (err) {
      console.error('Create post failed:', err);
      setError(err.response?.data?.message || 'Failed to create post.');
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <p>You can only see this page if you are an Editor or Admin.</p>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostPage;