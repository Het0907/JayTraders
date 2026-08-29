const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Initialize Razorpay only if credentials are present
let razorpay = null;
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (keyId && keySecret) {
    try {
        const Razorpay = require('razorpay');
        razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret
        });
        console.log('✓ Razorpay instance initialized');
    } catch (error) {
        console.warn('Razorpay initialization failed:', error.message);
    }
}

// Create order
router.post('/create-order', async (req, res) => {
    if (!razorpay) {
        return res.status(503).json({
            error: 'Payment service unavailable',
            message: 'Online payment is currently not configured.'
        });
    }

    try {
        const { amount } = req.body;
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ 
                error: 'Invalid request',
                details: 'Valid amount is required and must be greater than 0'
            });
        }

        const options = {
            amount: amount,
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error.message);
        res.status(500).json({ 
            error: 'Failed to create order',
            details: error.message
        });
    }
});

// Verify payment
router.post('/verify-payment', (req, res) => {
    if (!keySecret) {
        return res.status(503).json({
            error: 'Payment service unavailable',
            message: 'Online payment is currently not configured.'
        });
    }

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                details: 'All payment details are required for verification'
            });
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", keySecret)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            res.json({ verified: true });
        } else {
            res.status(400).json({ verified: false });
        }
    } catch (error) {
        console.error('Error in verify-payment:', error.message);
        res.status(500).json({ 
            error: 'Payment verification failed',
            details: error.message
        });
    }
});

module.exports = router;
 