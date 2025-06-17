const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/orders', async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "order_rcptid_" + Date.now()
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;