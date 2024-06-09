// setup with Routes App.js

import { React, useState, useEffect, } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import Docs from './pages/Docs';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider, useAuth } from './auth/authContext';
import Profile from './pages/Profile';
import Pricing from './components/Pricing';
import VerifyEmail from './pages/verifyAccount';
import Success from './pages/Success';
import SupportCenter from './pages/SupportCenter';

const App = () => {
  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/signin" element={<IsAuthenticated><Signin /></IsAuthenticated>} />
            <Route path="/auth/signup" element={<IsAuthenticated><Signup /></IsAuthenticated>} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/docs" element={<Docs />} />
            <Route path='/contact-us' element={<SupportCenter />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path='/success' element={<PrivateRoute><Success /></PrivateRoute>} />
            <Route path="/dashboard" element={<PaidRoute><Pricing /><Dashboard />
            </PaidRoute>} />
            <Route path='/admin' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { user, loading, isVerify, logout } = useAuth();

  if (loading) return null; // Optionally add a loading spinner here

  console.log(user);

  if (user && !isVerify()) {
    logout(); // Automatically log out if user is not verified
    return null; // Optionally display a message or redirect to a different page
  }

  return user && isVerify() ? children : <Navigate to="/auth/signin" />;
};

const IsAuthenticated = ({children}) => {
  const { user, loading } = useAuth();
  
  if(loading) return null;

  console.log(user);

  return !user ? children : <Navigate to="/" />;
};



const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return null; // Optionally add a loading spinner here

  return user && isAdmin() ? children : <Navigate to="/unauthorized" />;
};

const PaidRoute = ({ children }) => {
  const { user, hasAccess, loading } = useAuth();

  if (loading) return null; // Optionally add a loading spinner here

  console.log(user, hasAccess);

  return user && hasAccess() ? children : <Navigate to="/unauthorized" />;
};



export default App;

