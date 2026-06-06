import { useState, useCallback, useEffect } from 'react';
import { User } from '@/types';
import api from '@/utils/api';
import { parseJWT } from '@/utils/helpers';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data.data);
        } catch (err) {
          localStorage.removeItem('authToken');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post('/auth/login', { email, password });
        const { data, token } = response.data;
        localStorage.setItem('authToken', token);
        setUser(data);
        return { success: true };
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Login failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const signup = useCallback(
    async (email: string, password: string, fullName: string, educationLevel: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post('/auth/signup', {
          email,
          password,
          fullName,
          educationLevel,
        });
        const { data, token } = response.data;
        localStorage.setItem('authToken', token);
        setUser(data);
        return { success: true };
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Signup failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.isAdmin || false;

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated,
    isAdmin,
  };
};
