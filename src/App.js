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

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        JSON.parse(localStorage.getItem('isAuthenticated')) || false
    );

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    // Updated AuthRoute to use `children`
    const AuthRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" replace />;
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <ToastContainer />
            <Routes>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/products" element={<Products />} />
                <Route path="/verify-account" element={<VerifyAccount />} />
<Route path="/resend-verification" element={<ResendVerification />} />
                {/* Wrap Cart in AuthRoute */}
                <Route 
                    path="/cart" 
                    element={
                        <AuthRoute>
                            <Cart />
                        </AuthRoute>
                    } 
                />
                <Route path="/" element={<Navigate to="/products" />} />
            </Routes>
        </Router>
    );
}

export default App;
