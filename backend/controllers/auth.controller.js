import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Helper to generate a token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = await User.create({
      username,
      password, // The password will be hashed by the 'pre-save' hook
      role, // 'Viewer', 'Editor', or 'Admin'
    });

    if (user) {
      const token = generateToken(user._id, user.role);
      res.status(201).json({
        message: 'User created!',
        _id: user._id,
        username: user.username,
        role: user.role,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id, user.role);
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: token,
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};