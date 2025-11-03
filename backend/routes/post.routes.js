import express from 'express';
import { getAllPosts, createPost, deleteMyPost } from '../controllers/post.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/rbac.middleware.js';

const router = express.Router();

// Public route
router.get('/', getAllPosts);

// Protected routes
router.post('/', protect, authorize('Editor', 'Admin'), createPost);
router.delete('/:id', protect, deleteMyPost); // Ownership logic is in the controller

export default router;