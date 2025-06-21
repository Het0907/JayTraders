// Razorpay Configuration
export const RAZORPAY_CONFIG = {
    key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
    currency: 'INR',
    name: 'Jay Traders',
    description: 'Order Payment',
    theme: {
        color: '#3399cc',
    }
};

// Validate Razorpay configuration
export const validateRazorpayConfig = () => {
    if (!process.env.REACT_APP_RAZORPAY_KEY_ID) {
        console.error('REACT_APP_RAZORPAY_KEY_ID is not set in environment variables');
        return false;
    }
    return true;
};

export default RAZORPAY_CONFIG; 