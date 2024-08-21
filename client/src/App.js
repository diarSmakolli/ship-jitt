// setup with Routes App.js

import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import Docs from './pages/Docs';
import { AuthProvider, useAuth } from './auth/authContext';
import Profile from './pages/Profile';
import Pricing from './components/Pricing';
import VerifyEmail from './pages/verifyAccount';
import Success from './pages/Success';
import SupportCenter from './pages/SupportCenter';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { Navigate } from 'react-router-dom';
import Cancel from './pages/Cancel';
import DocsTutorialsAPICall from './pages/DocsTutorialsAPI-Call';
import DocsTutorialsUserAuthentication from './pages/DocsTutorialsUserAuthentication';
import DocsPrivatePage from './pages/DocsPrivatePage';
import DocsStripe from './pages/DocsStripe';
import DocsDatabase from './pages/DocsDatabase';
import DocsEmails from './pages/DocsEmails';
import DocsPayments from './pages/DocsPayments';
import DocsNavbar from './pages/DocsNavbar';
import Invoices from './pages/Invoices';
import InvoiceDetails from './pages/InvoiceDetails';





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
            <Route path='/docs/tutorials/api-call' element={<DocsTutorialsAPICall />} />
            <Route path='/docs/tutorials/authentication' element={<DocsTutorialsUserAuthentication />} />
            <Route path='/docs/tutorials/private-page' element={<DocsPrivatePage />} />
            <Route path='/docs/tutorials/stripe' element={<DocsStripe />} />
            <Route path='/docs/features/database' element={<DocsDatabase />} />
            <Route path='/docs/features/emails' element={<DocsEmails />} />
            <Route path='/docs/features/payments' element={<DocsPayments />} />
            <Route path='/docs/components/navbar' element={<DocsNavbar />} />
            <Route path='/contact-us' element={<SupportCenter />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path='/invoices' element={<PrivateRoute><Invoices /></PrivateRoute>} />
            <Route path='/invoices/:id' element={<PrivateRoute><InvoiceDetails /></PrivateRoute>} />
            <Route path='/success' element={<PrivateRoute><Success /></PrivateRoute>} />
            <Route path='/cancel' element={<PrivateRoute><Cancel /></PrivateRoute>} />
            <Route path="/dashboard" element={<PaidRoute><Dashboard /></PaidRoute>} />
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

  return user && isVerify() ? children : <Navigate to="/" />;
};

const IsAuthenticated = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

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

