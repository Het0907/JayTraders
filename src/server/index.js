const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors'); // You might already have this
const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors()); // Allow cross-origin requests from your frontend
app.use(express.json()); // To parse JSON request bodies

// Nodemailer transporter setup
// Configure this with your email service provider details
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports like 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Add these logs for debugging .env variables
console.log('Backend .env config:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'undefined'); // Log length for security
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_SECURE:', process.env.EMAIL_SECURE);
console.log('ADMIN_EMAIL_RECEIVER:', process.env.ADMIN_EMAIL_RECEIVER);

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  // Basic validation (you can add more robust validation)
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Name, Email, Subject, and Message are required.' });
  }

  try {
    console.log('Backend: Preparing mail options for contact form.');
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.ADMIN_EMAIL_RECEIVER,
      replyTo: email,
      subject: `New Contact Form Inquiry: ${subject}`,
      html: `
        <h2>New Inquiry from Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    console.log('Backend: Attempting to send email...');
    await transporter.sendMail(mailOptions);
    console.log('Backend: Contact form email sent successfully!');
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Backend: Error sending contact form email:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

// New Order Placement Endpoint
app.post('/api/orders/place-order', async (req, res) => {
  const { cartItems, totalAmount, selectedAddress, paymentDetails } = req.body;
  
  // You would typically save this order to your database here
  // For now, we'll just log it and send an email
  console.log('Received new order:', {
    cartItems,
    totalAmount,
    selectedAddress,
    paymentDetails,
  });

  // Construct HTML for the order details in the email
  let orderItemsHtml = '';
  if (cartItems && cartItems.length > 0) {
    orderItemsHtml = `
      <h3>Ordered Items:</h3>
      <table border="1" cellpadding="5" cellspacing="0" style="width:100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price (per item)</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          ${cartItems.map(item => `
            <tr>
              <td>${item.product.name}</td>
              <td>${item.quantity}</td>
              <td>₹${item.product.price}</td>
              <td>₹${item.totalPrice}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your admin email
      to: process.env.ADMIN_EMAIL_RECEIVER, // Admin's email to receive order notifications
      subject: `New Order Placed - #${paymentDetails.razorpay_order_id}`,
      html: `
        <h2>New Order Placed!</h2>
        <p>An order has been successfully placed on your website.</p>
        <p><strong>Order ID:</strong> ${paymentDetails.razorpay_order_id}</p>
        <p><strong>Payment ID:</strong> ${paymentDetails.razorpay_payment_id}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>

        <h3>Delivery Address:</h3>
        <p><strong>Company Name:</strong> ${selectedAddress.companyName || 'N/A'}</p>
        <p><strong>Street:</strong> ${selectedAddress.street}</p>
        <p><strong>City:</strong> ${selectedAddress.city}</p>
        <p><strong>State:</strong> ${selectedAddress.state}</p>
        <p><strong>Pincode:</strong> ${selectedAddress.pincode}</p>
        
        ${orderItemsHtml}

        <p>Please log in to your admin panel for more details.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Order placement email sent to admin successfully!');
    res.status(200).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error processing order and sending email:', error);
    res.status(500).json({ message: 'Failed to place order. Internal server error.' });
  }
});

// Basic route for testing server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 