// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userId: string, userRole: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const userId = Cookies.get('user_id');
    return !!userId;
  });

  const login = (userId: string, userRole: string) => {
    Cookies.set('user_id', userId, { expires: 1 });
    Cookies.set('user_role', userRole, { expires: 1 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('user_id');
    Cookies.remove('user_role');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
