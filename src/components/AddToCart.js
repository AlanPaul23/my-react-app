// src/components/AddToCartButton.js
import React, { useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

const AddToCartButton = ({ product_id}) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = async () => {
        try {
            const response = await api.addToCart(product_id, quantity);
            if (response.ok) {
                const data = await response.json();
                toast.success(data.Message);
            } else {
                const errorData = await response.json();
                toast.error(errorData.Message);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error.message);
            toast.error('Failed to add product to cart.');
        }
    };

    return (
        <div>
            <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="quantity-input"
            />
            <button onClick={handleAddToCart} className="add-to-cart-button">
                Add to Cart
            </button>
        </div>
    );
};

export default AddToCartButton;
