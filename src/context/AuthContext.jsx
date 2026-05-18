import { createContext, useContext, useEffect, useState } from 'react';
import { loadFromStorage, saveToStorage } from '../services/storage.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const session = loadFromStorage('agrolink-current-user');
    if (session) {
      setUser(session);
      setIsAuthenticated(true);
    }
  }, []);

  const register = (form) => {
    const users = loadFromStorage('agrolink-users') || [];
    const duplicate = users.some((item) => item.email === form.email);

    if (duplicate) {
      setError('A user with this email already exists.');
      return false;
    }

    const newUser = {
      ...form,
      id: `USER-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    saveToStorage('agrolink-users', [...users, newUser]);
    saveToStorage('agrolink-current-user', newUser);
    setUser(newUser);
    setIsAuthenticated(true);
    setError('');
    return true;
  };

  const login = ({ email, password }) => {
    const users = loadFromStorage('agrolink-users') || [];
    const found = users.find((item) => item.email === email && item.password === password);

    if (!found) {
      setError('Invalid email or password.');
      return false;
    }

    saveToStorage('agrolink-current-user', found);
    setUser(found);
    setIsAuthenticated(true);
    setError('');
    return true;
  };

  const logout = () => {
    localStorage.removeItem('agrolink-current-user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, error, register, login, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
