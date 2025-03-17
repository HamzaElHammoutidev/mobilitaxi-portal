
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string; // Added the phone property
  role: 'owner' | 'driver';
  status: 'pending' | 'validated';
  vehicleIds: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'owner' | 'driver') => Promise<void>;
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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('taxiUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Mock API call - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo
      const mockUser: User = {
        id: '123',
        name: 'Jean Dupont',
        email,
        phone: '+33 6 12 34 56 78', // Add the phone field
        role: email.includes('owner') ? 'owner' : 'driver',
        status: 'pending',
        vehicleIds: ['v1', 'v2']
      };
      
      localStorage.setItem('taxiUser', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success('Connexion réussie');
    } catch (error) {
      toast.error('Échec de la connexion');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    role: 'owner' | 'driver'
  ) => {
    try {
      setLoading(true);
      // Mock API call - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo
      const mockUser: User = {
        id: '123',
        name,
        email,
        phone: '', // Add empty phone field for new users
        role,
        status: 'pending',
        vehicleIds: []
      };
      
      localStorage.setItem('taxiUser', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success('Inscription réussie. Votre compte est en attente de validation.');
    } catch (error) {
      toast.error('Échec de l\'inscription');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('taxiUser');
    setUser(null);
    toast.info('Vous êtes déconnecté');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
