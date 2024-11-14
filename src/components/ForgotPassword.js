import React, { useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Email is required");
            return;
        }
    
        // Optional email format validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }
    
        try {
            const response = await api.forgotPassword(email);
            const responseData = await response.json();
            if (response.ok) {
                toast.success('Password reset link sent to your email');
            } else {
                toast.error(responseData.detail || 'Failed to send password reset link');
            }
        } catch (error) {
            console.error("Error during forgot password:", error);
            toast.error('An error occurred while sending the reset link');
        }
    };
    
    return (
        <div className='forgot-password-container'>
        <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Send Reset Link</button>
        </form>
        </div>
    );
}

export default ForgotPassword;
