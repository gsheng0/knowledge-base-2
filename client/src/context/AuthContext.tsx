import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  _id?: any;
  username: string;
  password: string;
  email: string;
  articles: string[];
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userInfo: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for authentication on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsAuthenticated(true);
      setUserInfo(JSON.parse(storedUser));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const signIn = (user: User) => {
    // Perform your authentication logic here
    // If authentication is successful, update isAuthenticated and store user info
    setIsAuthenticated(true);
    setUserInfo(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const signOut = () => {
    // Perform sign-out logic here
    // Update isAuthenticated to false and remove user info from localStorage
    setIsAuthenticated(false);
    setUserInfo(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, signIn, signOut }}>
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
