import axios from 'axios';

const isLocalhost = Boolean(
  typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
);

const configuredApiUrl = process.env.REACT_APP_API_URL || 'https://jaytraders-5.onrender.com';
const API_BASE_URL = (isLocalhost ? 'http://localhost:5000' : configuredApiUrl).replace(/\/$/, '');

axios.defaults.withCredentials = true;

export const API_ENDPOINTS = {
    BASE_URL: API_BASE_URL,
    AUTH: `${API_BASE_URL}/api/auth`,
    PRODUCTS: `${API_BASE_URL}/api/products`,
    ORDERS: `${API_BASE_URL}/api/orders`,
    PAYMENT: `${API_BASE_URL}/api/payment`,
    // Add other endpoints as needed
};

export default API_ENDPOINTS; 