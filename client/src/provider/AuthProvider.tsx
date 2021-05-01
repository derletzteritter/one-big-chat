import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
