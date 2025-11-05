import User from '../models/user.model.js';

// @desc    Get all users (Admin only)
// @route   GET /api/users
export const getAllUsers = async (req, res) => {
  try {
    // Find all users and remove the password field from the result
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    // Optional: Validate if the role is one of 'Viewer', 'Editor', 'Admin'
    if (!['Viewer', 'Editor', 'Admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();
    
    // Don't send the password back
    const updatedUser = await User.findById(req.params.id).select('-password');
    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};