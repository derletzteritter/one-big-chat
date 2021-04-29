import bcrypt from 'bcrypt';

export const createUser = async (username: string, password: string) => {
  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);
};
