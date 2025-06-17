// const express = require('express');
// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const { name, email, phone, company, subject, message } = req.body;
//     // You can save to DB, send email, etc. Here, just respond OK for now.
//     // TODO: Add your email sending logic here if needed.
//     res.status(200).json({ message: 'Inquiry received!' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to send inquiry.' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables (if not already loaded in main file)
dotenv.config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Name, Email, Subject, and Message are required.' });
  }

  try {
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

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending contact form email:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;