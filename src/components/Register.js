import React, { useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import './Register.css';

function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        if (!/^[A-Za-z]{1,50}$/.test(firstname)) {
            toast.error('First name must contain only alphabetic characters and be up to 50 characters long.');
            return;
        }
        if (!/^[A-Za-z]{1,50}$/.test(lastname)) {
            toast.error('Last name must contain only alphabetic characters and be up to 50 characters long.');
            return;
        }
        if (!/^\d{10}$/.test(mobilenumber)) {
            toast.error('Mobile number must be exactly 10 digits.');
            return;
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            toast.error('Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.');
            return;
        }

        // Data to send to the backend
        const data = {
            firstname,
            lastname,
            email,
            mobilenumber,
            password
        };

        // Send the registration request
        try {
            const response = await api.register(data);
            
            if (response.ok) {
                toast.success('Email sent to activate account');
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.Errors || errorData.Message || 'Registration failed';
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error('Error registering');
        }
    };

    return (
        <div className='register-container'>
             <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
            />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
             <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Mobile Number"
                value={mobilenumber}
                onChange={(e) => setMobilenumber(e.target.value)}
                required
                maxLength="10"
            />
            <button type="submit">Register</button>
        </form>
        </div>
    );
}

export default Register;
