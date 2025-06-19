import React, { useEffect, useState } from 'react';
import { useCart } from './context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingBag, FaSync } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import API_ENDPOINTS from './config/api';

const Cart = () => {
    const { cart, loading, error, removeFromCart, updateQuantity, getCartTotal, clearCart, fetchCart } = useCart();
    const [itemQuantities, setItemQuantities] = useState({});
    const navigate = useNavigate();

    // Initialize itemQuantities state when cart loads or changes
    useEffect(() => {
        const initialQuantities = {};
        cart.forEach(item => {
            initialQuantities[item._id] = item.quantity;
        });
        setItemQuantities(initialQuantities);
    }, [cart]);

    // Handle manual quantity input change
    const handleManualQuantityChange = (itemId, value) => {
        setItemQuantities(prev => ({ ...prev, [itemId]: value }));
    };

    // Handle quantity update on blur or Enter key press
    const handleQuantityUpdate = (itemId, currentQuantity, availableStock) => {
        const value = parseInt(currentQuantity);
        if (isNaN(value) || value < 1) {
            updateQuantity(itemId, 1);
            setItemQuantities(prev => ({ ...prev, [itemId]: 1 }));
        } else if (value > availableStock) {
            updateQuantity(itemId, availableStock);
            setItemQuantities(prev => ({ ...prev, [itemId]: availableStock }));
        } else {
            updateQuantity(itemId, value);
        }
    };

    // Refresh cart data
    const handleRefresh = async () => {
        await fetchCart();
    };

    // Razorpay checkout handler
    const handleCheckout = async () => {
        try {
            console.log('Starting checkout process...');
            const amount = Math.round(getCartTotal() * 100); // amount in paise
            console.log('Cart total (in paise):', amount);
            
            if (amount <= 0) {
                alert('Cart is empty!');
                return;
            }

            // Check if Razorpay key is available
            if (!process.env.REACT_APP_RAZORPAY_KEY_ID) {
                console.error('Razorpay key ID is missing');
                alert('Payment system is not properly configured. Please contact support.');
                return;
            }

            console.log('Creating order with amount:', amount);
            // 1. Call backend to create order
            const response = await axios.post(`${API_ENDPOINTS.PAYMENT}/create-order`, { amount });
            console.log('Order creation response:', response.data);

            if (!response.data || !response.data.id) {
                throw new Error('Invalid response from server');
            }

            // 2. Open Razorpay checkout
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: response.data.amount,
                currency: response.data.currency,
                name: "JayTraders",
                description: "Order Payment",
                order_id: response.data.id,
                handler: async function (response) {
                    console.log('Payment response:', response);
                    try {
                        // Verify payment
                        console.log('Verifying payment...');
                        const verifyResponse = await axios.post(`${API_ENDPOINTS.PAYMENT}/verify-payment`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        console.log('Verification response:', verifyResponse.data);

                        if (verifyResponse.data.verified) {
                            alert('Payment successful!');
                            clearCart();
                            // Optionally redirect to success page
                            // navigate('/success');
                        } else {
                            alert('Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        const errorMessage = error.response?.data?.details || error.response?.data?.error || error.message;
                        alert('Payment verification failed: ' + errorMessage);
                    }
                },
                prefill: {
                    email: "customer@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            console.log('Opening Razorpay popup...');
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Checkout error:', err);
            const errorMessage = err.response?.data?.details || err.response?.data?.error || err.message;
            alert('Failed to initiate payment: ' + errorMessage);
        }
    };

    const checkProfileCompletion = () => {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            toast.error('Please login to proceed with checkout');
            navigate('/login');
            return false;
        }

        // Get user email
        const userEmail = userData.email || userData.user?.email;

        // Check if user has any addresses
        const addresses = JSON.parse(localStorage.getItem(`addresses_${userEmail}`)) || [];
        if (addresses.length === 0) {
            toast.error('Please add a delivery address before proceeding');
            navigate('/profile');
            return false;
        }

        // Check if user has a default address
        const hasDefaultAddress = addresses.some(addr => addr.isDefault);
        if (!hasDefaultAddress) {
            toast.error('Please set a default delivery address');
            navigate('/profile');
            return false;
        }

        return true;
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Loading cart...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="text-red-600 text-2xl mb-4">Error</div>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <div className="space-y-4">
                        <button
                            onClick={handleRefresh}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <FaSync className="mr-2" />
                            Refresh Cart
                        </button>
                        <Link
                            to="/"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <FaArrowLeft className="mr-2" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const validCartItems = Array.isArray(cart)
        ? cart.filter(item => item && item.product && item.product._id && item.product.name)
        : [];

    if (!validCartItems.length) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <FaShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
                    <p className="mt-2 text-gray-600">Add some items to your cart to continue shopping.</p>
                    <div className="mt-6 space-y-4">
                        <button
                            onClick={handleRefresh}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <FaSync className="mr-2" />
                            Refresh Cart
                        </button>
                        <Link
                            to="/"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <FaArrowLeft className="mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <button
                    onClick={handleRefresh}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                    <FaSync className="mr-2" />
                    Refresh Cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            {validCartItems.map((item) => (
                                <div key={item._id} className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {item.product.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Brand: {item.product.brand}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Size: {item.variant.size}
                                            </p>
                                            <div className="mt-2 flex items-center">
                                                <label htmlFor={`quantity-${item._id}`} className="mr-2 text-sm text-gray-600">
                                                    Quantity:
                                                </label>
                                                <div className="flex items-center border rounded">
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={itemQuantities[item._id] || ''}
                                                        onChange={(e) => handleManualQuantityChange(item._id, e.target.value)}
                                                        onBlur={(e) => handleQuantityUpdate(item._id, e.target.value, item.variant.stock)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                handleQuantityUpdate(item._id, e.target.value, item.variant.stock);
                                                                e.target.blur();
                                                            }
                                                        }}
                                                        className="w-16 text-center border-x-0 outline-none text-gray-800"
                                                        min="1"
                                                        max={item.variant.stock}
                                                    />
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                        className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                                                        disabled={item.quantity >= item.variant.stock}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-lg font-semibold text-gray-900">
                                                ₹{item.totalPrice.toLocaleString()}
                                            </span>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-gray-900 font-semibold">
                                    ₹{getCartTotal().toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-gray-900 font-semibold">Shipping will be charged as per actuals</span>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between">
                                    <span className="text-lg font-semibold text-gray-900">Total</span>
                                    <span className="text-lg font-semibold text-gray-900">
                                        ₹{getCartTotal().toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (checkProfileCompletion()) {
                                        navigate('/checkout');
                                    }
                                }}
                                className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
                            >
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={clearCart}
                                className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-semibold"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;