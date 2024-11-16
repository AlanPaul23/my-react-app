import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Products from './components/Products';
import Cart from './components/Cart';
import VerifyAccount from './components/VerifyAccount';
import ResendVerification from './components/ResendVerification';
import OtpLogin from './components/OtpLogin';
import Checkout from './components/Checkout';
import './App.css';
import OrderHistory from './components/OrderHistory';
import UserProfile from './components/UserProfile';
import ReactivateAccount from './components/ReactivateAccount';
import ReactivateVerification from './components/ReactivateVerification';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        JSON.parse(localStorage.getItem('isAuthenticated')) || false
    );

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);



    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <ToastContainer />
            <div className='app-container'>
            <Routes>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/otp-login" element={<OtpLogin setIsAuthenticated={setIsAuthenticated} />}  />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/products" element={<Products />} />
                <Route path="/verify-account" element={<VerifyAccount />} />
                <Route path="/resend-verification" element={<ResendVerification />} />
                <Route path="/cart" element={<Cart setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/checkout" element={<Checkout setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/order-history" element={<OrderHistory setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/profile" element={<UserProfile setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/reactivate-verification" element={<ReactivateVerification />} />
                <Route path="/reactivate-account" element={<ReactivateAccount />} />
                <Route path="/" element={<Navigate to="/products" />} />
            </Routes>
            </div>
        </Router>
    );
}

export default App;
