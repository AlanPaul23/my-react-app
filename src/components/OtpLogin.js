// src/components/OtpLogin.js
import React, { useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './OtpLogin.css';

function OtpLogin({ setIsAuthenticated }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            const response = await api.requestOtp(phoneNumber);
            console.log('OTP Verification Response:', response);  // Debugging line
            if (!response || !response.message) throw new Error('Unexpected response from server');
            toast.success(response.message);
            setIsOtpSent(true); // Move to OTP verification stage
        } catch (error) {
            toast.error(error.message || 'Failed to send OTP');
        }
    };
    
    const handleVerifyOtp = async () => {
        console.log('Verifying OTP with:', { phoneNumber, otp });
        try {
            const response = await api.verifyOtp(phoneNumber, otp);
            console.log('OTP Verification Response:', response);  // Debugging line
            if (!response || !response.message) throw new Error('Unexpected response from server');
            
            toast.success(response.message);
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', true);
    
            navigate('/products');
        } catch (error) {
            toast.error(error.message || 'OTP verification failed');
            console.error('Error:', error);  // Additional error logging
        }
    };
    
    return (
        <div className='otp-login-container'>
            <h2>Login with OTP</h2>
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isOtpSent}
            />
            {isOtpSent && (
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
            )}
            <button onClick={isOtpSent ? handleVerifyOtp : handleSendOtp}>
                {isOtpSent ? 'Verify OTP' : 'Send OTP'}
            </button>
        </div>
    );
}

export default OtpLogin;
