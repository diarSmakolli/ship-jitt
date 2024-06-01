// authContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      getUser(decodedToken.id);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    getUser(decodedToken.id);
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:6099/api/users/logout', {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const getUser = async (userId, token) => {
    try {
      const response = await axios.get(`http://localhost:6099/api/users/${userId}`, {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = () => {
    return user && user.isAdmin;
  };

  const hasAccess = () => {
    return user && user.hasAccess;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, hasAccess, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
