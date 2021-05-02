import { User } from '../../typings/user';
import { promisePool } from '../../utils/db';

export const checkUser = async () => {
  return 'username';
};

export const getCredentials = async (uid: string): Promise<string> => {
  const [
    results,
  ] = await promisePool.query(`SELECT username FROM users WHERE uid = ?`, [
    uid,
  ]);
  const result = <User[]>results;
  return result[0].username;
};
