const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Store verification codes (in production, use a database)
const verificationCodes = new Map();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send verification email
router.post('/send-verification', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate 6-digit code
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    
    // Store the code with timestamp
    verificationCodes.set(email, {
      code: verificationCode,
      timestamp: Date.now()
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email address',
      html: `
        <h1>Welcome to Jay Traders!</h1>
        <p>Hi ${name},</p>
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `
    });

    res.json({ success: true, message: 'Verification code sent' });
  } catch (error) {
    console.error('Send verification error:', error);
    res.status(500).json({ message: 'Failed to send verification code' });
  }
});

// Verify email code
router.post('/verify-email', (req, res) => {
  try {
    const { email, code } = req.body;
    const storedData = verificationCodes.get(email);

    if (!storedData) {
      return res.status(400).json({ message: 'No verification code found' });
    }

    // Check if code is expired (10 minutes)
    if (Date.now() - storedData.timestamp > 10 * 60 * 1000) {
      verificationCodes.delete(email);
      return res.status(400).json({ message: 'Verification code expired' });
    }

    if (storedData.code !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Code is valid
    verificationCodes.delete(email);
    res.json({ verified: true });
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(500).json({ message: 'Failed to verify code' });
  }
});

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user instance
    // The password hashing will be handled by the pre('save') hook in the User model
    user = new User({
      name,
      email,
      phone,
      password
    });

    // Save user. The pre('save') hook will hash the password before saving.
    await user.save();

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        console.log('Auth Route (Register): JWT_SECRET used for signing:', process.env.JWT_SECRET);
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
          }
        });
      }
    );
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password using the model's method
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      console.log('Invalid password for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.error('Token generation error:', err);
          return res.status(500).json({ message: 'Error generating token' });
        }
        console.log('Auth Route (Login): JWT_SECRET used for signing:', process.env.JWT_SECRET);
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
          }
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, password: require('crypto').randomBytes(20).toString('hex') });
      await user.save();
    }

    // Create JWT for your app
    const appToken = jwt.sign(
      { user: { id: user.id, role: user.role } },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token: appToken, user });
  } catch (error) {
    res.status(401).json({ message: 'Google authentication failed' });
  }
});

// Forgot Password - send reset link
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // For security, don't reveal if user exists
      return res.json({ message: 'If an account exists for this email, a reset link has been sent.' });
    }
    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1 hour
    await user.save();
    // Send email
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `<h1>Password Reset</h1><p>Click the link below to reset your password:</p><a href="${resetUrl}">${resetUrl}</a><p>This link will expire in 1 hour.</p>`
    });
    res.json({ message: 'If an account exists for this email, a reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Failed to send reset link' });
  }
});

// Reset Password - set new password
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
});

module.exports = router; 