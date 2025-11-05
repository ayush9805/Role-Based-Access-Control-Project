// In routes/post.routes.js

import express from 'express';
// 1. IMPORT THE NEW CONTROLLER
import { 
  getAllPosts, 
  createPost, 
  deleteMyPost, 
  updatePost,
  getPostById // ADDED
} from '../controllers/post.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/rbac.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById); // <--- ADDED THIS ROUTE (For fetching single post data)

// Protected routes
router.post('/', protect, authorize('Editor', 'Admin'), createPost);
router.delete('/:id', protect, deleteMyPost); 
router.put('/:id', protect, updatePost);

export default router;