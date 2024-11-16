// Navbar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import './Navbar.css';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);  // State to handle menu toggle
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await api.logout();
            if (response.ok) {
                setIsAuthenticated(false);
                localStorage.removeItem('isAuthenticated');
                toast.success('Logged out successfully');
                window.location.href = '/login';  // Refresh page after logout
            } else {
                toast.error('Failed to log out');
            }
        } catch (error) {
            toast.error('Error logging out');
        }
    };

    const handleLinkClick = (path) => {
        window.location.href = path;  // Forces page refresh on link click
    };

    return (
        <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
            <h1 className="brand">EasyShop</h1>
            <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className="links">
                {isAuthenticated ? (
                    <>
                      <button onClick={() => handleLinkClick('/products')} className="linkButton">Products</button>
                        <button onClick={() => handleLinkClick('/cart')} className="linkButton">Cart</button>
                        <button onClick={() => handleLinkClick('/order-history')} className="linkButton">Order History</button>
                        <button onClick={handleLogout} className="linkButton">Logout</button>
                       

                    </>
                ) : (
                    <>
                      <button onClick={() => handleLinkClick('/products')} className="linkButton">Products</button>
                        <button onClick={() => handleLinkClick('/login')} className="linkButton">Login</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
