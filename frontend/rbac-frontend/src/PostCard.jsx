import React from 'react';
import { useAuth } from './useAuth.jsx'; // <-- IMPORT UPDATED
import axios from 'axios';

const PostCard = ({ post, onPostDeleted }) => {
  const { user, token } = useAuth();

  const isAuthor = user && user._id === post.authorId;
  const isAdmin = user && user.role === 'Admin';
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

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p><em>(Author: {post.authorName})</em></p>
      <p>{post.content}</p>
      
      {canModify && (
        <div className="post-actions">
          <button>Edit</button> { /* Edit button is not implemented */ }
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostCard;