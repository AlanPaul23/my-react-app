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

    // Function to handle sending OTP
    const handleSendOtp = async () => {
        try {
            const response = await api.requestOtp(phoneNumber);
            toast.success(response.message);
            setIsOtpSent(true); // Move to OTP verification stage
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleVerifyOtp = async () => {
        console.log('Verifying OTP with:', { phoneNumber, otp }); // Debugging log
        try {
            const response = await api.verifyOtp(phoneNumber, otp);
            toast.success(response.message);
    
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', true);
    
            navigate('/products');
        } catch (error) {
            toast.error(error.message);
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
