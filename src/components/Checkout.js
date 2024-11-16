import React, { useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

const Checkout = ({ setIsAuthenticated }) => {
    const [orderDetails, setOrderDetails] = useState(null);

    const handleCheckout = async () => {
        try {
            const response = await api.checkout();
            if (response.Success) {
                setOrderDetails(response);
                toast.success(response.Message);
            } else {
                toast.error('Checkout failed.');
            }
        } catch (error) {
            console.error('Error during checkout:', error.message);
            toast.error('Failed to proceed with checkout.');
        }
    };

    const handlePayment = async () => {
        if (!orderDetails) {
            toast.error('No order details available. Please checkout first.');
            return;
        }
        try {
            const response = await api.makePayment(orderDetails["Order ID"]);
            if (response.Success) {
                toast.success(response.Message);
                setOrderDetails(null); // Reset after successful payment
            } else {
                toast.error('Payment failed.');
            }
        } catch (error) {
            console.error('Error during payment:', error.message);
            toast.error('Failed to process payment.');
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
            {orderDetails && (
                <div>
                    <h3>Order Summary</h3>
                    <p>Order ID: {orderDetails["Order ID"]}</p>
                    <p>Total Amount: ₹{orderDetails["Total Amount"]}</p>
                    <button onClick={handlePayment}>Make Payment</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;
