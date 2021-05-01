import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  return { user, setUser };
};
