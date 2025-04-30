
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '@/services/api';
import { User } from '@/types';

// Define the shape of our context
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      const currentUser = apiService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    const result = await apiService.loginUser({ email, password });
    if (result.success) {
      setUser(apiService.getCurrentUser());
    }
    return result;
  };

  // Register function
  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const result = await apiService.registerUser(userData);
    if (result.success) {
      setUser(apiService.getCurrentUser());
    }
    return result;
  };

  // Logout function
  const logout = async () => {
    await apiService.logoutUser();
    setUser(null);
  };

  // Context value
  const value = {
    user,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
