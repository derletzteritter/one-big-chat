import mysql from 'mysql2';

const connection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'onebigchat',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: 3306,
});

export const promisePool = connection.promise();
