import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import './ResetPassword.css';

function ResetPassword() {
    const [new_password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token'); // Get the token from the URL query parameters

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (new_password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            const response = await api.resetPassword(token, { new_password });
            if (response.ok) {
                toast.success('Password reset successful');
                navigate('/login');
            } else {
                toast.error('Failed to reset password');
            }
        } catch (error) {
            toast.error('Error resetting password');
        }
    };

    return (
        <div className='reset-password-container'>
        <form onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={new_password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <button type="submit">Reset Password</button>
        </form>
        </div>
    );
}

export default ResetPassword;
