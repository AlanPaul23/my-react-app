// src/components/ResendVerification.js
import React, { useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

function ResendVerification({ onClose }) {
    const [email, setEmail] = useState('');

    const handleResendVerification = (e) => {
        e.preventDefault();
        api.resendVerification({ email })
            .then((response) => {
                toast.success(response.Message || 'Verification email sent.');
                if (onClose) onClose();
            })
            .catch((error) => {
                toast.error(error.message || 'Failed to send verification email.');
            });
    };

    return (
        <div>
            <form onSubmit={handleResendVerification}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Resend Verification</button>
            </form>
        </div>
    );
}

export default ResendVerification;