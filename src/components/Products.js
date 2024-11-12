import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import AddToCartButton from './AddToCart';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (query = '') => {
    setLoading(true);
    setMessage('');
    try {
      const response = await api.getProducts(query);
      const data = await response.json();
      if (Array.isArray(data.Products)) {
        setProducts(data.Products);
      } else {
        setProducts([]);
        setMessage('No products found.');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setMessage('Error fetching products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setMessage('Please enter a search query.');
      return;
    }
    await fetchProducts(searchQuery);
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="container">
      <h2>Products</h2>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products"
        />
        <button type="submit">Search</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <div className="product-card" key={product.productID}>
              <img src={product.imageUrl} alt={product.model} />
              <h3>{product.product}</h3>
              <p>{product.model}</p>
              <p>{product.description}</p>
              <p className="price">Price: ₹{product.price}</p>
              <AddToCartButton productId={product.productID} />
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
