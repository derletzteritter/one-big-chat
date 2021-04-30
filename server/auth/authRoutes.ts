import { Router } from 'express';
import { handleSignup } from './controller/authController';

export const router = Router();

router.post('/signup', handleSignup);
