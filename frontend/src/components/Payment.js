import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Payment = ({ onBeforePayment, selectedAddress }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const initiatePayment = async () => {
    try {
      console.log('Payment component: initiatePayment called.');
      // Check profile completion before creating order
      if (onBeforePayment) {
        const profileCheck = onBeforePayment();
        console.log('Payment component: Profile completion check result:', profileCheck);
        if (!profileCheck) {
          toast.error('Profile details incomplete. Cannot proceed with payment.');
          setPaymentInitiated(false); // Reset to false if check fails
          return;
        }
      }

      const currentCartTotal = getCartTotal();
      console.log('Payment component: Cart Total for payment:', currentCartTotal);

      if (currentCartTotal <= 0) {
        toast.error('Cart total is zero or less. Cannot proceed with payment.');
        console.error('Payment component: Cart total is invalid:', currentCartTotal);
        setPaymentInitiated(false); // Reset to false if check fails
        return;
      }

      setPaymentInitiated(true);

        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = async () => {
          try {
          console.log('Payment component: Razorpay script loaded.');

          const amountInPaise = Math.round(currentCartTotal * 100);
          console.log('Payment component: Attempting to create order with amount (in paise):', amountInPaise);
            // Create order
            const response = await fetch('http://localhost:5000/api/payment/create-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ amount: amountInPaise }),
            });

            if (!response.ok) {
            const errorData = await response.json();
            console.error('Payment component: Failed to create order. Response:', response.status, errorData);
            throw new Error(errorData.message || 'Failed to create order');
            }

            const order = await response.json();
          console.log('Payment component: Order created successfully:', order);

          console.log('Payment component: Razorpay Key ID:', process.env.REACT_APP_RAZORPAY_KEY_ID);
            // Initialize Razorpay
            const options = {
              key: process.env.REACT_APP_RAZORPAY_KEY_ID,
              amount: order.amount,
              currency: order.currency,
              name: 'Jay Traders',
            description: 'Order Payment',
              order_id: order.id,
              handler: async function (response) {
              console.log('Payment component: Razorpay handler response:', response);
                try {
                  // Verify payment
                  const verifyResponse = await fetch('http://localhost:5000/api/payment/verify-payment', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                    }),
                  });

                  if (!verifyResponse.ok) {
                  const errorData = await verifyResponse.json();
                  console.error('Payment component: Payment verification failed. Response:', verifyResponse.status, errorData);
                  throw new Error(errorData.message || 'Payment verification failed');
                  }

                  const verification = await verifyResponse.json();
                console.log('Payment component: Payment verification result:', verification);

                  if (verification.verified) {
                    toast.success('Payment successful!');
                  
                  // --- Place Order API Call --- //
                  try {
                    const placeOrderResponse = await fetch('http://localhost:5000/api/orders/place-order', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is needed for auth
                      },
                      body: JSON.stringify({
                        cartItems: cart,
                        totalAmount: currentCartTotal,
                        selectedAddress: selectedAddress,
                        paymentDetails: {
                          razorpay_order_id: response.razorpay_order_id,
                          razorpay_payment_id: response.razorpay_payment_id,
                          razorpay_signature: response.razorpay_signature,
                        },
                      }),
                    });

                    if (!placeOrderResponse.ok) {
                      const errorData = await placeOrderResponse.json();
                      console.error('Payment component: Failed to place order. Response:', placeOrderResponse.status, errorData);
                      toast.error('Order placement failed: ' + (errorData.message || 'Unknown error'));
                      return;
                  }

                    console.log('Payment component: Order placed successfully!');
                    clearCart(); // Clear cart after successful order placement
                    navigate('/success'); // Redirect to success page

                  } catch (orderError) {
                    console.error('Payment component: Error placing order:', orderError);
                    toast.error('Failed to place order after payment. Please contact support.');
                  }
                  // --- End Place Order API Call --- //

                } else {
                  toast.error('Payment verification failed');
                }
              } catch (error) {
                console.error('Payment component: Payment verification error:', error);
                toast.error('Payment verification failed: ' + error.message);
                }
              },
              prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '9999999999',
              },
              theme: {
                color: '#3399cc',
              },
            };

          const rzp = new window.Razorpay(options);
          rzp.open();
          } catch (error) {
          console.error('Payment component: Payment initialization error inside onload:', error);
            toast.error('Failed to initialize payment');
          setPaymentInitiated(false); // Reset on error
        } finally {
          // Remove the script after use to avoid duplicates
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
          }
        };

        script.onerror = () => {
        console.error('Payment component: Failed to load Razorpay script.');
          toast.error('Failed to load Razorpay');
        setPaymentInitiated(false); // Reset on error
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        };
      } catch (error) {
      console.error('Payment component: Script loading error outside initiatePayment:', error);
        toast.error('Failed to load payment system');
      setPaymentInitiated(false); // Reset on error
      }
    };

  return (
      <div className="text-center">
      <p className="text-gray-600 mb-4">Total Amount: ₹{getCartTotal()}</p>
      <p className="text-sm text-gray-500">Click the button below to proceed with payment</p>
      {!paymentInitiated && (
        <button
          onClick={initiatePayment}
          className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold mt-4"
        >
          Confirm Address & Proceed to Pay
        </button>
      )}
      {paymentInitiated && (
        <p className="text-green-600 mt-4">Redirecting to payment gateway...</p>
      )}
    </div>
  );
};

export default Payment; 