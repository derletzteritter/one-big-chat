import { Router } from 'express';
import { RepositoryNotFoundError } from 'typeorm';
import {
  handleSignup,
  handleLogin,
  handleUser,
  handleLogout,
} from './controller/authController';

export const router = Router();

router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.post('/user', handleUser);
router.get('/logout', handleLogout);
