// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Cart({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await api.getCart();
                if (response.status === 401 || response.status === 403) {
                    setIsAuthenticated(false);
                    localStorage.removeItem('isAuthenticated');
                    toast.error('Session expired, please log in again');
                    navigate('/login');
                    return;
                }
                const data = await response.json();
                setCart(data["Cart Items"]);
            } catch (error) {
                console.error('Error fetching cart:', error.message);
                toast.error('Error fetching cart');
            }
        };
        fetchCart();
    }, [setIsAuthenticated, navigate]);

    const handleDelete = async (itemId) => {
        try {
            await api.deleteCartItem(itemId);
            setCart((prevItems) => prevItems.filter(item => item.id !== itemId));
            toast.success('Item removed from cart');
        } catch {
            toast.error('Failed to remove item');
        }
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cart.length > 0 ? (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            <p>{item.productName} - Quantity: {item.quantity} - Price: ₹{item.price}</p>
                            <button onClick={() => handleDelete(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default Cart;
