// In routes/user.routes.js
import express from 'express';
// 1. Import updateUserRole
import { getAllUsers, updateUserRole } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/rbac.middleware.js';

const router = express.Router();

router.get('/', protect, authorize('Admin'), getAllUsers);

// 2. ADD THIS NEW ROUTE (Only Admins can do this)
router.put('/:id', protect, authorize('Admin'), updateUserRole);

export default router;