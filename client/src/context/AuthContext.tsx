import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../model/user';

interface AuthContextProps {
  isAuthenticated: boolean;
  signIn: (userInfo: User) => void;
  signOut: () => void;
  userInfo: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: any = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const signIn = (userInfo: User) => {
    // Perform your authentication logic here
    // If authentication is successful, update isAuthenticated
    setIsAuthenticated(true);
    setUserInfo(userInfo);
  };

  const signOut = () => {
    // Perform sign-out logic here
    // Update isAuthenticated to false
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
