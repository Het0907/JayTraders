const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://jaytraders-5.onrender.com';

export const API_ENDPOINTS = {
    BASE_URL: API_BASE_URL,
    AUTH: `${API_BASE_URL}/api/auth`,
    PRODUCTS: `${API_BASE_URL}/api/products`,
    ORDERS: `${API_BASE_URL}/api/orders`,
    PAYMENT: `${API_BASE_URL}/api/payment`,
    // Add other endpoints as needed
};

export default API_ENDPOINTS; 