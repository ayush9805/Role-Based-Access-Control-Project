import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth.jsx';
import axios from 'axios';

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setTitle(response.data.title);
        setContent(response.data.content);
        setLoading(false);
      } catch (err) {
        // --- ERROR NOW USED ---
        setError(err.response?.data?.message || 'Failed to load post. You may not have permission.');
        setLoading(false);
      }
    };

    if (token) {
      fetchPost();
    }
  }, [postId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await axios.put(`http://localhost:5000/api/posts/${postId}`, { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      navigate('/');
    } catch (err) {
      // --- ERROR NOW USED ---
      setError(err.response?.data?.message || 'Failed to update post. Please try again.');
    }
  };

  // ... (rest of the file is unchanged)

  if (loading) {
    return <div>Loading post...</div>;
  }
  
  if (error && !title) { 
    return <div className="login-error">{error}</div>;
  }

  return (
    <div className="post-form-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="login-error">{error}</p>}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;