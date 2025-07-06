import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import API_ENDPOINTS from '../config/api';
import { RAZORPAY_CONFIG, validateRazorpayConfig } from '../config/razorpay';

const Payment = ({ onBeforePayment, selectedAddress }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [placingOrder, setPlacingOrder] = useState(false);

  const placeOrder = async () => {
    if (onBeforePayment) {
      const profileCheck = onBeforePayment();
      if (!profileCheck) {
        toast.error('Profile details incomplete. Cannot place order.');
        return;
      }
    }
    if (!selectedAddress) {
      toast.error('Please select a delivery address.');
      return;
    }
    if (getCartTotal() <= 0) {
      toast.error('Cart total is zero or less. Cannot place order.');
      return;
    }
    setPlacingOrder(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`${API_ENDPOINTS.ORDERS}/place-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          cartItems: cart,
          totalAmount: getCartTotal(),
          selectedAddress,
          user,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error('Order placement failed: ' + (errorData.message || 'Unknown error'));
        setPlacingOrder(false);
        return;
      }
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/success');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      setPlacingOrder(false);
    }
  };

  return (
    <div className="text-center">
      <p className="text-gray-600 mb-4">Total Amount: ₹{getCartTotal()}</p>
      <p className="text-sm text-gray-500">Click the button below to place your order</p>
      <button
        onClick={placeOrder}
        className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold mt-4"
        disabled={placingOrder}
      >
        {placingOrder ? 'Placing Order...' : 'Confirm Address & Place Order'}
      </button>
    </div>
  );
};

export default Payment; 