
import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbService } from '@/services/dbService';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
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
        lastLogin: new Date()
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For this simplified auth system, we're just checking credentials and creating a mock user
      // In a real app, you'd verify against a backend
      if (email && password) {
        // Save user to database
        const userData = await dbService.saveUser({
          name: email.split('@')[0],
          email,
          lastLogin: new Date()
        });
        
        // Create user object
        const newUser = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Record user login in search history for analytics
        await dbService.saveSearch({
          userId: userData.id,
          query: 'USER_LOGIN'
        });
      } else {
        throw new Error('Invalid credentials');
      }
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
      // Mock signup
      if (name && email && password) {
        // Save user to database
        const userData = await dbService.saveUser({
          name,
          email,
          lastLogin: new Date()
        });
        
        // Create user object
        const newUser = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Record user signup in search history for analytics
        await dbService.saveSearch({
          userId: userData.id,
          query: 'USER_SIGNUP'
        });
      } else {
        throw new Error('Please fill all required fields');
      }
    } catch (error) {
      console.error('Signup error:', error);
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
