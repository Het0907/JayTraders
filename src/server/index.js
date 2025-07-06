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
  const { cartItems, selectedAddress, user, totalAmount } = req.body;

  // Validate company name and address
  if (!user || !user.companyName || !selectedAddress || !selectedAddress.street) {
    return res.status(400).json({ message: 'Company name and address are required to place an order.' });
  }

  // Prepare order data for Excel
  const orderId = 'ORD-' + Date.now();
  const orderDate = new Date().toLocaleString();
  const orderProducts = cartItems.map(item => `${item.product.name} (x${item.quantity})`).join(', ');

  // Excel file logic
  const ExcelJS = require('exceljs');
  const fs = require('fs');
  const excelPath = 'orders.xlsx';
  let workbook, worksheet;
  if (fs.existsSync(excelPath)) {
    workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelPath);
    worksheet = workbook.getWorksheet('Orders');
  } else {
    workbook = new ExcelJS.Workbook();
    worksheet = workbook.addWorksheet('Orders');
    worksheet.columns = [
      { header: 'Order ID', key: 'orderId', width: 20 },
      { header: 'User Name', key: 'userName', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Company Name', key: 'companyName', width: 25 },
      { header: 'Address', key: 'address', width: 40 },
      { header: 'Products', key: 'products', width: 40 },
      { header: 'Total Amount', key: 'totalAmount', width: 15 },
      { header: 'Date', key: 'date', width: 20 },
    ];
  }
  worksheet.addRow({
    orderId,
    userName: user.name,
    email: user.email,
    companyName: user.companyName,
    address: `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.pincode}`,
    products: orderProducts,
    totalAmount,
    date: orderDate,
  });
  await workbook.xlsx.writeFile(excelPath);

  // Email notification to admin
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL_RECEIVER,
      subject: `New Order Placed - #${orderId}`,
      html: `
        <h2>New Order Placed!</h2>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>User:</strong> ${user.name} (${user.email})</p>
        <p><strong>Company Name:</strong> ${user.companyName}</p>
        <p><strong>Address:</strong> ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.pincode}</p>
        <p><strong>Products:</strong> ${orderProducts}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
        <p><strong>Date:</strong> ${orderDate}</p>
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

// Endpoint for admin to download the Excel file
app.get('/api/orders/download-excel', (req, res) => {
  const filePath = 'orders.xlsx';
  const fs = require('fs');
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'orders.xlsx');
  } else {
    res.status(404).json({ message: 'No orders file found.' });
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