import { Router } from 'express';
import { handleSignup } from './controller/authController';

export const router = Router();

router.post('/signup', handleSignup);
router.get('/signup', (req, res) => res.send('hello'));
