import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await api.logout();
            if (response.ok) {
                setIsAuthenticated(false);
                localStorage.removeItem('isAuthenticated'); 
                toast.success('Logged out successfully');
                navigate('/login');
            } else {
                toast.error('Failed to log out');
            }
        } catch (error) {
            toast.error('Error logging out');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/products?search=${searchTerm}`);
            setSearchTerm(''); // Clear search input after search
        }
    };

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.brand}>Admin Console</h1>

           

            <div style={styles.links}>
                {isAuthenticated ? (
                    <>
                        <Link to="/products" style={styles.link}>Products</Link>
                        <Link to="/cart" style={styles.link}>Cart</Link>
                        <button onClick={handleLogout} style={styles.linkButton}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Register</Link>
                        <Link to="/forgotpassword" style={styles.link}>Forgot Password</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

const styles = {
    navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        backgroundColor: '#333',
        color: '#fff',
    },
    brand: {
        fontSize: '1.5rem',
        color: '#fff',
    },
    searchForm: {
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        padding: '0.5rem',
        marginRight: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    searchButton: {
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: '#fff',
        cursor: 'pointer',
    },
    links: {
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        marginLeft: '1rem',
    },
    linkButton: {
        color: '#fff',
        textDecoration: 'none',
        marginLeft: '1rem',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    },
};
