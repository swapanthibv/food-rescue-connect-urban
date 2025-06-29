
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  userType: 'donor' | 'volunteer' | null;
  login: (email: string, password: string, type?: 'donor' | 'volunteer') => Promise<boolean>;
  signup: (userData: any, type: 'donor' | 'volunteer') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'donor' | 'volunteer' | null>(null);

  useEffect(() => {
    // Load user from localStorage on app start
    const savedUser = localStorage.getItem('user');
    const savedUserType = localStorage.getItem('userType');
    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser));
      setUserType(savedUserType as 'donor' | 'volunteer');
    }
  }, []);

  const login = async (email: string, password: string, type: 'donor' | 'volunteer' = 'donor'): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password combination
      if (email && password) {
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email: email,
        };
        
        setUser(userData);
        setUserType(type);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userType', type);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData: any, type: 'donor' | 'volunteer'): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
      };
      
      setUser(newUser);
      setUserType(type);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('userType', type);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  };

  const value = {
    user,
    userType,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
