import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;  // Add for Google profile picture
  authProvider?: 'email' | 'google';  // Track auth provider
}

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  sub: string;  // Google's unique identifier
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => void;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Update the last login in the database
      dbService.saveUser({
        name: parsedUser.name,
        email: parsedUser.email,
        picture: parsedUser.picture,
        authProvider: parsedUser.authProvider,
        lastLogin: new Date()
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // In a real app, you'd validate credentials against a backend
      // For this simplified version, we'll just create/update the user
      const userData = await dbService.saveUser({
        name: email.split('@')[0],
        email,
        authProvider: 'email' as const,
        lastLogin: new Date()
      });
      
      // Create user object
      const newUser = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        authProvider: 'email' as const,
      } as const;
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Record user login in search history for analytics
      await dbService.saveSearch({
        userId: userData.id,
        query: 'USER_LOGIN'
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      if (!name || !email || !password) {
        throw new Error('Please fill all required fields');
      }
      
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      
      // Save user to database
      const userData = await dbService.saveUser({
        name,
        email,
        authProvider: 'email' as const,
        lastLogin: new Date()
      });
      
      // Create user object
      const newUser = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        authProvider: 'email' as const,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Record user signup in search history for analytics
      await dbService.saveSearch({
        userId: userData.id,
        query: 'USER_SIGNUP'
      });
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const loginWithGoogle = async (credential: string) => {
    setIsLoading(true);
    try {
      // Decode the JWT token from Google
      const decoded = jwtDecode<GoogleUser>(credential);
      
      if (!decoded.email) {
        throw new Error('Google authentication failed');
      }
      
      // Save user to database
      const userData = await dbService.saveUser({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        authProvider: 'google' as const,
        lastLogin: new Date()
      });
      
      // Create user object
      const newUser = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        picture: decoded.picture,
        authProvider: 'google' as const,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Record Google login in search history for analytics
      await dbService.saveSearch({
        userId: userData.id,
        query: 'USER_LOGIN_GOOGLE'
      });
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Record user logout if user exists
    if (user) {
      dbService.saveSearch({
        userId: user.id,
        query: 'USER_LOGOUT'
      });
    }
    
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
