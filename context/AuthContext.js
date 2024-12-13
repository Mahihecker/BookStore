import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt.decode(token);
      const isTokenExpired = decoded.exp * 1000 < Date.now();
      if (!isTokenExpired) {
        setUser({ id: decoded.id, email: decoded.email });
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const { token, user } = await response.json();
      setUser(user);
      localStorage.setItem('token', token);
      return true;
    } catch (error) {
      console.error('Login error:', error.message);
      return false;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Signup failed:', data.message);
        return false;
      }

      console.log('Signup successful:', data.message);
      return true;
    } catch (error) {
      console.error('Signup error:', error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
