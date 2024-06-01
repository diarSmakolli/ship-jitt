// setup with Routes App.js

import { React, useState, useEffect }  from 'react';
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



export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const token = Cookies.get('token');
  //       if (!token) {
  //         throw new Error('No token found');
  //       }
  //       const decoded = jwtDecode(token);
  //       console.log('Decoded:', decoded);
  //       setUser(decoded);
  //       setIsAdmin(decoded.role === 'admin');
  //     } catch (error) {
  //       console.error('Error:', error);
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // }, []); 

  useEffect(() => {
    const getUser = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await axios.get(`http://localhost:6099/api/users/${userId}`, {
          withCredentials: true
        });

        setUser(response.data.user);
        console.log(response);

        console.log(user);

      } catch(error) {
        console.error('Error:', error);
        setError(error);
        setLoading(false);
      }
    }

    getUser();
  }, []);

  

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/docs' element={<Docs />} /> 
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/admin' element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}