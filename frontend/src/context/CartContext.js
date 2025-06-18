import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../config/api';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0);

    // Get token from localStorage
    const getAuthToken = () => {
        const token = localStorage.getItem('token');
        console.log('Current auth token:', token ? 'Token exists' : 'No token found');
        return token;
    };

    // Create axios instance with default config
    const api = axios.create({
        baseURL: API_ENDPOINTS.BASE_URL + '/api',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Add request interceptor to add token to all requests
    api.interceptors.request.use((config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Adding token to request:', {
                url: config.url,
                method: config.method,
                headers: {
                    ...config.headers,
                    Authorization: 'Bearer [TOKEN]' // Don't log the actual token
                }
            });
        } else {
            console.log('No token available for request:', {
                url: config.url,
                method: config.method
            });
        }
        return config;
    });

    // Add response interceptor for debugging
    api.interceptors.response.use(
        (response) => {
            console.log('API Response:', {
                url: response.config.url,
                status: response.status,
                data: response.data
            });
            return response;
        },
        (error) => {
            console.error('API Error:', {
                url: error.config?.url,
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                headers: error.config?.headers
            });
            return Promise.reject(error);
        }
    );

    // Memoize fetchCart to prevent infinite loops
    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching cart...');
            
            const token = getAuthToken();
            if (!token) {
                console.error('No authentication token found');
                setError('Please login to view your cart');
                setLoading(false);
                return;
            }

            const response = await api.get('/cart');
            console.log('Cart API Response:', response.data);
            
            if (response.data && response.data.success && Array.isArray(response.data.items)) {
                console.log('Setting cart items:', response.data.items);
                setCart(response.data.items);
            } else {
                console.error('Invalid cart data structure:', response.data);
                setError('Invalid cart data received from server');
            }
        } catch (err) {
            console.error('Error fetching cart:', err);
            setError(err.response?.data?.message || 'Failed to fetch cart');
        } finally {
            setLoading(false);
        }
    }, []); // Empty dependency array since we're using getAuthToken from closure

    // Initial cart fetch
    useEffect(() => {
        fetchCart();
    }, []); // Remove fetchCart from dependencies to prevent infinite loops

    // const addToCart = async (productId, variantId, quantity) => {
    //     try {
    //         setError(null);
    //         console.log('Adding to cart:', { productId, variantId, quantity });
            
    //         const token = getAuthToken();
    //         if (!token) {
    //             setError('Please login to add items to cart');
    //             return false;
    //         }

    //         const response = await api.post('/cart/add', {
    //             productId,
    //             variantId,
    //             quantity
    //         });
            
    //         console.log('Add to cart response:', response.data);
            
    //         if (response.data.success) {
    //             console.log('Item added successfully, refreshing cart...');
    //             await fetchCart(); // Refresh cart after adding item
    //             setCartUpdateTrigger(prev => prev + 1);
    //             return true;
    //         }
    //         setError(response.data?.message || 'Failed to add item to cart');
    //         return false;
    //     } catch (err) {
    //         console.error('Error adding to cart:', err);
    //         if (err.response?.status === 401) {
    //             setError('Please login to add items to cart');
    //         } else {
    //             setError(err.response?.data?.message || 'Failed to add item to cart');
    //         }
    //         return false;
    //     }
    // };

    // const removeFromCart = async (itemId) => {
    //     try {
    //         setError(null);
    //         console.log('Removing item from cart:', itemId);
            
    //         const token = getAuthToken();
    //         if (!token) {
    //             setError('Please login to remove items from cart');
    //             return false;
    //         }

    //         const response = await api.delete(`/cart/${itemId}`);
            
    //         console.log('Remove from cart response:', response.data);
            
    //         if (response.data.success) {
    //             console.log('Item removed successfully, refreshing cart...');
    //             await fetchCart(); // Refresh cart after removing item
    //             setCartUpdateTrigger(prev => prev + 1);
    //             return true;
    //         }
    //         setError(response.data?.message || 'Failed to remove item from cart');
    //         return false;
    //     } catch (err) {
    //         console.error('Error removing from cart:', err);
    //         if (err.response?.status === 401) {
    //             setError('Please login to remove items from cart');
    //         } else {
    //             setError(err.response?.data?.message || 'Failed to remove item from cart');
    //         }
    //         return false;
    //     }
    // };

    // const updateQuantity = async (itemId, quantity) => {
    //     try {
    //         setError(null);
    //         console.log('Updating cart item quantity:', { itemId, quantity });
            
    //         const token = getAuthToken();
    //         if (!token) {
    //             setError('Please login to update cart');
    //             return false;
    //         }

    //         const response = await api.put(`/cart/${itemId}`, { quantity });
            
    //         console.log('Update quantity response:', response.data);
            
    //         if (response.data.success) {
    //             console.log('Quantity updated successfully, refreshing cart...');
    //             await fetchCart(); // Refresh cart after updating quantity
    //             setCartUpdateTrigger(prev => prev + 1);
    //             return true;
    //         }
    //         setError(response.data?.message || 'Failed to update cart');
    //         return false;
    //     } catch (err) {
    //         console.error('Error updating cart:', err);
    //         if (err.response?.status === 401) {
    //             setError('Please login to update cart');
    //         } else {
    //             setError(err.response?.data?.message || 'Failed to update cart');
    //         }
    //         return false;
    //     }
    // };

    // const clearCart = async () => {
    //     try {
    //         setError(null);
    //         console.log('Clearing cart...');
            
    //         const token = getAuthToken();
    //         if (!token) {
    //             setError('Please login to clear cart');
    //             return false;
    //         }

    //         const response = await api.delete('/cart');
            
    //         console.log('Clear cart response:', response.data);
            
    //         if (response.data.success) {
    //             console.log('Cart cleared successfully');
    //             setCart([]);
    //             setCartUpdateTrigger(prev => prev + 1);
    //             return true;
    //         }
    //         setError(response.data?.message || 'Failed to clear cart');
    //         return false;
    //     } catch (err) {
    //         console.error('Error clearing cart:', err);
    //         if (err.response?.status === 401) {
    //             setError('Please login to clear cart');
    //         } else {
    //             setError(err.response?.data?.message || 'Failed to clear cart');
    //         }
    //         return false;
    //     }
    // };

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (productId, variantId, quantity) => {
        try {
            setError(null);
            console.log('Adding to cart:', { productId, variantId, quantity });
            
            const token = getAuthToken();
            if (!token) {
                setError('Please login to add items to cart');
                return false;
            }

            const response = await api.post('/cart/add', {
                productId,
                variantId,
                quantity
            });
            
            console.log('Add to cart response:', response.data);
            
            if (response.data.success) {
                // Update cart state with the complete cart from response
                console.log('Updating cart with items:', response.data.items);
                setCart(response.data.items);
                // Force a cart refresh to ensure consistency
                await fetchCart();
                return true;
            }
            setError(response.data?.message || 'Failed to add item to cart');
            return false;
        } catch (err) {
            console.error('Error adding to cart:', err);
            if (err.response?.status === 401) {
                setError('Please login to add items to cart');
            } else {
                setError(err.response?.data?.message || 'Failed to add item to cart');
            }
            return false;
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            setError(null);
            const token = getAuthToken();
            if (!token) {
                setError('Please login to remove items from cart');
                return false;
            }

            const response = await api.delete(`/cart/items/${itemId}`);
            
            if (response.data.success) {
                // Update cart state immediately by removing the item
                setCart(prevCart => prevCart.filter(item => item._id !== itemId));
                return true;
            }
            setError(response.data?.message || 'Failed to remove item from cart');
            return false;
        } catch (err) {
            if (err.response?.status === 401) {
                setError('Please login to remove items from cart');
            } else {
                setError(err.response?.data?.message || 'Failed to remove item from cart');
            }
            return false;
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            setError(null);
            const token = getAuthToken();
            if (!token) {
                setError('Please login to update cart');
                return false;
            }

            // Optimistically update the cart state
            setCart(prevCart => prevCart.map(item => 
                item._id === itemId 
                    ? { ...item, quantity, totalPrice: item.product.price * quantity }
                    : item
            ));

            const response = await api.put(`/cart/items/${itemId}`, { quantity });
            
            if (response.data.success) {
                return true;
            }
            
            // If the API call fails, revert the optimistic update
            await fetchCart();
            setError(response.data?.message || 'Failed to update cart');
            return false;
        } catch (err) {
            // If there's an error, revert the optimistic update
            await fetchCart();
            if (err.response?.status === 401) {
                setError('Please login to update cart');
            } else {
                setError(err.response?.data?.message || 'Failed to update cart');
            }
            return false;
        }
    };

    const clearCart = async () => {
        try {
            setError(null);
            const token = getAuthToken();
            if (!token) {
                setError('Please login to clear cart');
                return false;
            }
            const response = await api.delete('/cart');
            if (response.data.success) {
                setCart([]);
                setError(null);
                return true;
            }
            setError(response.data?.message || 'Failed to clear cart');
            return false;
        } catch (err) {
            if (err.response?.status === 401) {
                setError('Please login to clear cart');
            } else {
                setError(err.response?.data?.message || 'Failed to clear cart');
            }
            return false;
        }
    };

    const getCartTotal = () => {
        const total = cart.reduce((total, item) => total + item.totalPrice, 0);
        console.log('Calculating cart total:', total);
        return total;
    };

    const value = {
        cart,
        loading,
        error,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
        fetchCart // Expose fetchCart for manual refreshes
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 