import { Router } from 'express';
import { handleSignup, handleLogin } from './controller/authController';

export const router = Router();

router.post('/signup', handleSignup);
router.post('/login', handleLogin);
