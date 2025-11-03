import React, { useState, useEffect } from 'react';
import PostCard from './PostCard.jsx';
import axios from 'axios';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/posts');
      
      const formattedPosts = data.map(post => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        authorId: post.author._id, 
        authorName: post.author.username,
      }));
      setPosts(formattedPosts);

    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;

  return (
    <div className="home-page">
      <h1>All Posts</h1>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onPostDeleted={fetchPosts} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;