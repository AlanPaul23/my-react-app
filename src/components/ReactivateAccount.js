import React, { useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

function ReactivateAccount() {
    const [token, setToken] = useState('');

    const handleReactivateAccount = async () => {
        try {
            const response = await api.reactivateAccount(token);
            const data = await response.json();

            if (response.ok) {
                toast.success(data.detail || 'Account activated successfully.');
            } else {
                toast.error(data.detail || 'Failed to activate account.');
            }
        } catch (error) {
            console.error('Error reactivating account:', error);
            toast.error('Error activating account.');
        }
    };

    return (
        <div>
            <h3>Reactivate Account</h3>
            <label>
                Token:
                <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
            </label>
            <button onClick={handleReactivateAccount}>Reactivate Account</button>
        </div>
    );
}

export default ReactivateAccount;
