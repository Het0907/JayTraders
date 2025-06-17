const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// List of admin emails
const ADMIN_EMAILS = ['parikhhet91@gmail.com']; // Add your admin email here

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Set admin role based on email before saving
userSchema.pre('save', async function(next) {
  try {
    console.log('Checking admin status for email:', this.email);
    console.log('Admin emails list:', ADMIN_EMAILS);
    
    // Set admin role if email is in ADMIN_EMAILS list
    if (ADMIN_EMAILS.includes(this.email.toLowerCase())) {
      console.log('Setting admin role for:', this.email);
      this.role = 'admin';
    } else {
      console.log('Setting user role for:', this.email);
      this.role = 'user';
    }

    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
      console.log('Password not modified, skipping hash');
      return next();
    }

    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed successfully');
    next();
  } catch (error) {
    console.error('Error in pre-save hook:', error);
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password match:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

// Add validation error handling
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'ValidationError') {
    console.error('Validation Error:', error);
    next(new Error(Object.values(error.errors).map(err => err.message).join(', ')));
  } else if (error.code === 11000) {
    console.error('Duplicate Key Error:', error);
    next(new Error('Email already exists'));
  } else {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User; 