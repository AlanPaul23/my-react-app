import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);
                const response = await api.getCart();

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        setIsAuthenticated(false);
                        localStorage.removeItem('isAuthenticated');
                        toast.error('Session expired, please log in again');
                        navigate('/login');
                    } else {
                        toast.error('Failed to fetch cart');
                    }
                    return;
                }

                const data = await response.json();
                setCart(data["Cart Items"]);
            } catch (error) {
                console.error('Error fetching cart:', error.message);
                toast.error('Error fetching cart');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [setIsAuthenticated, navigate]);

    const handleDelete = async (cartItemId) => {
        try {
            const response = await api.deleteCartItem(cartItemId);

            if (!response.ok) {
                toast.error('Failed to remove item');
                return;
            }

            setCart((prevItems) => prevItems.filter(item => item.id !== cartItemId));
            toast.success('Item removed from cart');
        } catch (error) {
            console.error('Error removing item:', error.message);
            toast.error('Error removing item');
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.error('Your cart is empty. Add items to proceed to checkout.');
            return;
        }
        navigate('/checkout');
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>

            {loading ? (
                <p>Loading your cart...</p>
            ) : cart.length > 0 ? (
                <div>
                    <ul className="cart-list">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <div className='cart'>
                                    <img src={item.imageUrl} alt={item.model} />
                                    <p>{item.model}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ₹{item.price}</p>
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => handleDelete(item.id)} // Use `id` here
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="checkout-container">
                        <button className="checkout-button" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default Cart;
