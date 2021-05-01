import { Router } from 'express';
import { RepositoryNotFoundError } from 'typeorm';
import { handleSignup, handleLogin } from './controller/authController';

export const router = Router();

router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.get('/user');
