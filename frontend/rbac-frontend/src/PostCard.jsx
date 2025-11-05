import React from 'react';
import { useAuth } from './useAuth.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <-- 1. IMPORT THIS

const PostCard = ({ post, onPostDeleted }) => {
  const { user, token } = useAuth();
  const navigate = useNavigate(); // <-- 2. INITIALIZE THIS

  const isAuthor = user && user._id === post.authorId;
  const isAdmin = user && user.role === 'Admin'; // This check is correct
  const canModify = isAuthor || isAdmin;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onPostDeleted(); // Refresh the post list
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. You may not be authorized.');
    }
  };

  // --- 3. ADD THIS FUNCTION ---
  // This function runs when you click the "Edit" button
  const handleEdit = () => {
    // It tells React Router to go to the edit page for this post
    navigate(`/edit-post/${post._id}`);
  };

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p><em>(Author: {post.authorName})</em></p>
      <p>{post.content}</p>
      
      {canModify && (
        <div className="post-actions">
          {/* --- 4. CONNECT THE BUTTON --- */}
          <button onClick={handleEdit} className="edit-button-small">Edit</button>
          <button onClick={handleDelete} className="delete-button-small">Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostCard;