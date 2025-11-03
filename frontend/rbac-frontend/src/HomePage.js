import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import axios from 'axios'; // Import axios

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Create a "fetchPosts" function
  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Use the public endpoint to get all posts
      const { data } = await axios.get('http://localhost:5000/api/posts');
      
      // The API now returns the author object, so we adjust the PostCard data
      const formattedPosts = data.map(post => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        authorId: post.author._id, // Pass the author's ID
        authorName: post.author.username, // Pass the author's name
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
          // We pass the "fetchPosts" function so the card can refresh the list on delete
          <PostCard key={post._id} post={post} onPostDeleted={fetchPosts} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;