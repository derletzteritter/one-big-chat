import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  return (
    <AuthContext.Provider
      value={{ user, setUser, userDetails, setUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
