import { Request, Response } from 'express';
import { User } from '../../typings/user';
import { promisePool } from '../../utils/db';
import { createToken, maxAge } from '../lib/tokens';
import { createLogin, createUser } from '../services/user';

export const handleSignup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await createUser(username, password);

    const token = createToken(user.uid);
    res.cookie('onebigchat', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user.uid });
  } catch (err) {
    console.log(err.message);
  }
};

const handleLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = createLogin(username, password);
  } catch (err) {
    console.log(err.message);
  }
};
