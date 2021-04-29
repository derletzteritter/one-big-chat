import jwt from 'jsonwebtoken';

export const maxAge = 3 * 24 * 60 * 60;
export const createToken = (uid: string) => {
  return jwt.sign({ uid }, 'bigchatsmallchat', {
    expiresIn: maxAge,
  });
};
