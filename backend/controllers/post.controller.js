import Post from '../models/post.model.js';

// @desc    Get all posts
// @route   GET /api/posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
export const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = new Post({
      title,
      content,
      author: req.user._id, // Set author from the logged-in user
    });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a post (by author or Admin)
// @route   DELETE /api/posts/:id
export const deleteMyPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const isAuthor = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'Admin';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete' });
    }

    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
// @desc    Update a post (by author OR Admin)
// @route   PUT /api/posts/:id
export const updatePost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // --- FIX: Allow Admin to edit OR the original Author ---
    const isAuthor = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'Admin'; 

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }
    // --------------------------------------------------------

    // Update the fields only if they are provided
    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};