import React, { useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import ResendVerification from './ResendVerification';

function Login({ setIsAuthenticated }) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showResendVerification, setShowResendVerification] = useState(false);
    const [loginError, setLoginError] = useState(null); // New state for tracking login errors
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.login(credentials);
            const data = await response.json();

            if (response.ok) {
                setIsAuthenticated(true);
                toast.success(data.Message || 'Login successful');
                navigate('/products');
            } else {
                toast.error(data.error || 'Login failed');
                // Check if the error is related to an unactivated account
                if (data.error && data.error.includes('Account not activated')) {
                    setLoginError('Account not activated');
                    setShowResendVerification(true); // Show the resend verification button
                }
            }
        } catch (error) {
            toast.error('Error logging in');
            console.error('Login error:', error);
        }
    };

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <button type="submit">Login</button>
            </form>

            {/* Navigation buttons for Register, Forgot Password, OTP Login */}
            <div className="auth-links">
                <button onClick={() => navigate('/register')} className="auth-link">Create Account</button>
                <button onClick={() => navigate('/otp-login')} className="auth-link">Login with OTP</button>
                <button onClick={() => navigate('/forgotpassword')} className="auth-link">Forgot Password?</button>

                {/* Conditionally render the "Resend Verification" button */}
                {loginError === 'Account not activated' && (
                    <button onClick={() => setShowResendVerification(!showResendVerification)}>
                        {showResendVerification ? 'Hide' : 'Resend Verification'}
                    </button>
                )}
                {showResendVerification && <ResendVerification />}
            </div>
        </div>
    );
}

export default Login;
