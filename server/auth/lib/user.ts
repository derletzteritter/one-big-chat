import { User } from '../../typings/user';
import { promisePool } from '../../utils/db';

export const checkUser = async () => {
  return 'username';
};

export const getCredentials = async (username: string): Promise<User> => {
  const [
    results,
  ] = await promisePool.query(`SELECT * FROM users WHERE username = ?`, [
    username,
  ]);
  const result = <User[]>results;
  return result[0];
};
