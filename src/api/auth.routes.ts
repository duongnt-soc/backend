import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = Router();

// Định nghĩa route cho /api/auth/register
router.post('/register', register);

// Định nghĩa route cho /api/auth/login
router.post('/login', login);

export default router;