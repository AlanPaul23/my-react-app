import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import ResendVerification from './ResendVerification';

function Login({ setIsAuthenticated }) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showResendVerification, setShowResendVerification] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.login(credentials);
            const data = await response.json();

            if (response.ok) {
                const { role, user_id, Message } = data;
                setIsAuthenticated(true);
                localStorage.setItem('role', role);
                localStorage.setItem('user_id', user_id);

                toast.success(Message || 'Login successful');
                navigate('/products');
            } else {
                toast.error(data.error || 'Login failed');
            }
        } catch (error) {
            toast.error('Error logging in');
            console.error('Login error:', error);
        }
    };

    return (
        <div>
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
            <button onClick={() => setShowResendVerification(!showResendVerification)}>
                {showResendVerification ? 'Hide' : 'Resend Verification'}
            </button>
            {showResendVerification && <ResendVerification />}
        </div>
    );
}

export default Login;
