import React, { useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

function ReactivateVerification() {
    const [email, setEmail] = useState('');

    const handleReactivateVerification = async (e) => {
        e.preventDefault();

        try {
            const response = await api.reactivateVerification({ email });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.Message || 'Verification email sent successfully.');
            } else {
                toast.error(data.Message || 'Failed to send verification email.');
            }
        } catch (error) {
            console.error('Error reactivating verification:', error);
            toast.error('Error sending verification email.');
        }
    };

    return (
        <div>
            <h3>Reactivate Verification</h3>
            <form onSubmit={handleReactivateVerification}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Send Verification Email</button>
            </form>
        </div>
    );
}

export default ReactivateVerification;
