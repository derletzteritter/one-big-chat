import bcrypt from 'bcrypt';
import { promisePool } from '../../utils/db';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../typings/user';
import { ResultSetHeader } from 'mysql2';

export const createUser = async (
  username: string,
  password: string,
): Promise<User> => {
  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);
  const uid = uuidv4();

  const [
    results,
  ] = await promisePool.query(
    `INSERT INTO users (uid, username, password) VALUES (?, ?, ?)`,
    [uid, username, encryptedPassword],
  );

  const result = <ResultSetHeader>results;
  const user = await getUser(result.insertId);

  return user;
};

export const getUser = async (id: number): Promise<any> => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const [results] = await promisePool.query(query, [id]);
  const users = <any[]>results;
  const user = users[0];
  return user;
};

export const doesUserExist = async (
  username: string,
): Promise<string | null> => {
  console.log('does user exsist: ', username);
  const query = `SELECT * FROM users WHERE username = ?`;
  const [results] = await promisePool.query(query, [username]);
  const result = <any[]>results;
  console.log('RESULT: ', result);

  if (result[0] == undefined) {
    return null;
  } else {
    return result[0].username;
  }
};

export const createLogin = async (
  username: string,
  password: string,
): Promise<User | null> => {
  const [
    results,
  ] = await promisePool.query(`SELECT * FROM users WHERE username = ?`, [
    username,
  ]);
  const result = <User[]>results;
  const user = result[0];

  if (user) {
    const resultPass = await bcrypt.compare(password, user.password);
    if (resultPass) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
