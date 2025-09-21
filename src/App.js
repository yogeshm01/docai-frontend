import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar'; 
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import Contact from './pages/contact';
import './App.css';
import './index.css';

// A wrapper component to conditionally show Navbar
const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/signup']; // Add routes where navbar should NOT appear

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {shouldShowNavbar && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
