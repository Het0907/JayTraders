import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Payment from './Payment';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      toast.error('Please login to proceed with checkout');
      navigate('/login');
      return;
    }

    const userEmail = userData.email || userData.user?.email;
    const savedAddresses = JSON.parse(localStorage.getItem(`addresses_${userEmail}`)) || [];
    setAddresses(savedAddresses);

    // If there's a default address, pre-select it
    const defaultAddress = savedAddresses.find(addr => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    } else if (savedAddresses.length > 0) {
      // If no default but addresses exist, select the first one
      setSelectedAddress(savedAddresses[0]);
    }

    checkProfileCompletion(userData, savedAddresses);
  }, [navigate]);

  const checkProfileCompletion = (userData, savedAddresses) => {
    if (!userData) {
      toast.error('Please login to proceed with checkout');
      navigate('/login');
      return false;
    }

    if (savedAddresses.length === 0) {
      toast.error('Please add a delivery address before proceeding');
      navigate('/profile');
      return false;
    }

    return true;
  };

  const handleProceedToPayment = () => {
    // Re-check profile completion with current data
    const userData = JSON.parse(localStorage.getItem('user'));
    const userEmail = userData.email || userData.user?.email;
    const savedAddresses = JSON.parse(localStorage.getItem(`addresses_${userEmail}`)) || [];
    
    if (!checkProfileCompletion(userData, savedAddresses)) {
      return false;
    }

    if (!selectedAddress) {
      toast.error('Please select a delivery address.');
      return false;
    }

    if (!agreedToTerms) {
      toast.error('You must agree to the Terms and Conditions before proceeding.');
      return false;
    }

    // Proceed with payment - here you could pass selectedAddress to Payment component if needed
    return true;
  };

  // If cart is empty, redirect to cart page
  if (!cart || cart.length === 0) {
    toast.error('Your cart is empty');
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">₹{item.totalPrice}</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <p className="font-bold">Total</p>
                <p className="font-bold">₹{getCartTotal()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
          {addresses.length > 0 ? (
            <div className="space-y-4">
              {addresses.map((address, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryAddress"
                    value={address.street} // Using street as a simple unique value for radio, actual object is in selectedAddress state
                    checked={selectedAddress && selectedAddress.street === address.street}
                    onChange={() => setSelectedAddress(address)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <div>
                    <p className="font-medium">{address.companyName ? `${address.companyName}, ` : ''}{address.street}</p>
                    <p className="text-sm text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
                    {address.isDefault && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">
                        Default
                      </span>
                    )}
                  </div>
                </label>
              ))}
              <p className="text-sm text-gray-500 mt-2">Please select an address for delivery.</p>
            </div>
          ) : (
            <p className="text-gray-600">No addresses found. Please add an address in your <a href="/profile" className="text-blue-600 hover:underline">profile</a>.</p>
          )}
        </div>

        {/* Payment Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          <Payment onBeforePayment={handleProceedToPayment} selectedAddress={selectedAddress} disabled={!agreedToTerms} />
        </div>
      </div>
    </div>
  );
};

export default Checkout; 