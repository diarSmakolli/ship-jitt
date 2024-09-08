// // authContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { useToast } from '@chakra-ui/react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   let toast = useToast();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       getUser(decodedToken.id);
//     } else {
//       setLoading(false);
//     }

//   }, []);

//   const handleTokenExpired = () => {
//     toast({
//       title: 'Session Expired',
//       description: 'Your session has expired. Please login again.',
//       status: 'info',
//       duration: 3000,
//       isClosable: true,
//     });
//     setTimeout(() => {
//       logout();
//     }, 3000);
//   };


//   const login = (token) => {
//     localStorage.setItem('token', token);
//     const decodedToken = jwtDecode(token);
//     getUser(decodedToken.id);
//   };

//   const logout = async () => {
//     try {
//       await axios.post('http://localhost:6099/api/users/logout', {}, {
//         withCredentials: true
//       });
//     } catch (error) {
//       console.error('Error logging out:', error);
//     } finally {
//       localStorage.removeItem('token');
//       setUser(null);
//     }
//   };

//   const getUser = async (userId, token) => {
//     try {
//       const response = await axios.get(`http://localhost:6099/api/users/${userId}`, {
//         withCredentials: true,
//       });
//       setUser(response.data.user);
//     } catch (error) {
//       if (error.response && error.response.status === 401 && error.response.data.message === 'Token has expired.') {
//         handleTokenExpired();
//         console.log(error);
//       } else {
//         console.error('Error fetching user:', error);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isAdmin = () => {
//     return user && user.isAdmin;
//   };

//   const hasAccess = () => {
//     return user && user.hasAccess;
//   };

//   const isVerify = () => {
//     return user && user.isVerify;
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAdmin, hasAccess, isVerify, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


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
      try {
        const decodedToken = jwtDecode(token);
        getUser(decodedToken.id);
      } catch (error) {
        console.error('Invalid token', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const getUser = async (userId) => {
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

  const isVerify = () => {
    return user && user.isVerify;
  }

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

  // onst getUser = async (userId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:6099/api/users/${userId}`, {
  //       withCredentials: true,
  //     });
  //     setUser(response.data.user);
  //   } catch (error) {
  //     console.error('Error fetching user:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <AuthContext.Provider value={{ user, logout, isAdmin, hasAccess, isVerify, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
