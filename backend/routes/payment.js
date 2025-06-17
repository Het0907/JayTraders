const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Debug logging for environment variables
console.log('=== Payment Route Initialization ===');
console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? 'Present' : 'Missing');

// Validate environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error('ERROR: Razorpay credentials are missing!');
    console.error('Please check your .env file in the backend directory.');
    console.error('Required variables:');
    console.error('RAZORPAY_KEY_ID=your_key_id');
    console.error('RAZORPAY_KEY_SECRET=your_key_secret');
}

// Initialize Razorpay
let razorpay;
try {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    console.log('✓ Razorpay instance created successfully');
} catch (error) {
    console.error('ERROR: Failed to create Razorpay instance:', error.message);
}

// Create order
router.post('/create-order', async (req, res) => {
    console.log('\n=== Create Order Request ===');
    console.log('Request body:', req.body);
    
    try {
        // Validate Razorpay instance
        if (!razorpay) {
            throw new Error('Razorpay instance not initialized');
        }

        // Validate request
        if (!req.body || typeof req.body.amount !== 'number') {
            console.error('Invalid request body:', req.body);
            return res.status(400).json({ 
                error: 'Invalid request',
                details: 'Amount is required and must be a number'
            });
        }

        const { amount } = req.body;
        console.log('Amount received:', amount);

        // Validate amount
        if (amount <= 0) {
            console.error('Invalid amount:', amount);
            return res.status(400).json({ 
                error: 'Invalid amount',
                details: 'Amount must be greater than 0'
            });
        }

        // Create order options
        const options = {
            amount: amount, // Use the actual amount
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        console.log('Creating order with options:', options);

        // Create order
        const order = await razorpay.orders.create(options);
        console.log('✓ Order created successfully:', order);
        
        res.json(order);
    } catch (error) {
        console.error('ERROR in create-order:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            statusCode: error.statusCode,
            error: error.error
        });

        // Send detailed error response
        res.status(500).json({ 
            error: 'Failed to create order',
            details: error.message,
            code: error.code || 'UNKNOWN_ERROR',
            statusCode: error.statusCode
        });
    }
});

// Verify payment
router.post('/verify-payment', (req, res) => {
    console.log('\n=== Verify Payment Request ===');
    console.log('Request body:', req.body);
    
    try {
        // Validate request
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            console.error('Missing required fields in verification request');
            return res.status(400).json({ 
                error: 'Missing required fields',
                details: 'All payment details are required for verification'
            });
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        console.log('Verifying payment signature...');
        
        if (razorpay_signature === expectedSign) {
            console.log('✓ Payment verified successfully');
            res.json({ verified: true });
        } else {
            console.log('✗ Payment verification failed');
            res.status(400).json({ verified: false });
        }
    } catch (error) {
        console.error('ERROR in verify-payment:', error);
        res.status(500).json({ 
            error: 'Payment verification failed',
            details: error.message,
            code: error.code || 'UNKNOWN_ERROR'
        });
    }
});

module.exports = router; 