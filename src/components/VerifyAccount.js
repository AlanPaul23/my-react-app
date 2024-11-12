// src/components/VerifyAccount.js
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

function VerifyAccount() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            api.verifyAccount(token)
                .then((response) => {
                    toast.success(response.detail || 'Account verified successfully!');
                    setStatus('success');
                })
                .catch((error) => {
                    toast.error(error.message || 'Verification failed.');
                    setStatus('error');
                });
        }
    }, [searchParams]);

    return (
        <div>
            {status === 'success' && <p>Your account has been verified!</p>}
            {status === 'error' && <p>There was an error verifying your account. Please try again.</p>}
        </div>
    );
}

export default VerifyAccount;
