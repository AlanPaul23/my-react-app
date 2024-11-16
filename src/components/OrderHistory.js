import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import './OrderHistory.css';

function OrderHistory({ setIsAuthenticated }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                setLoading(true);
                const response = await api.getOrderHistory();

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        setIsAuthenticated(false);
                        localStorage.removeItem('isAuthenticated');
                        toast.error('Session expired, please log in again');
                        return;
                    }
                    toast.error('Failed to fetch order history');
                    return;
                }

                const data = await response.json();
                setOrders(data.Orders);
            } catch (error) {
                console.error('Error fetching order history:', error.message);
                toast.error('Error fetching order history');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [setIsAuthenticated]);

    return (
        <div className="order-history-container">
            <h2>Order History</h2>

            {loading ? (
                <p>Loading your order history...</p>
            ) : orders.length > 0 ? (
                <ul className="order-list">
                    {orders.map((order) => (
                        <li key={order.id} className="order-item">
                            <h3>Order ID: {order.id}</h3>
                            <p>Order Date: {new Date(order.created_at).toLocaleDateString()}</p>
                            <p>Total Amount: ₹{order.total_amount}</p>
                            <p>Status: {order.is_paid ? 'Paid' : 'Pending'}</p>
                            <h4>Items:</h4>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        {item.product} - Quantity: {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no orders yet.</p>
            )}
        </div>
    );
}

export default OrderHistory;
