require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const paymentRoutes = require('./routes/payment');
const contactRoutes = require('./routes/contact');
const cookieParser = require('cookie-parser');
const Category = require('./models/Category');
const Product = require('./models/Product');
const { seedDatabase } = require('./scripts/initDb');

const app = express();

app.use(cookieParser());


// CORS configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) ||
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:') ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.netlify.app')) {
      return callback(null, true);
    }
    return callback(new Error('Origin is not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Set Cross-Origin-Opener-Policy header to allow postMessage from OAuth providers
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'cross-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});



// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));


// Middleware — limit raised to 10 MB to support Base64 image uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connect to MongoDB with better error handling
console.log('Attempting to connect to MongoDB...');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jaytraders', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log('✓ Successfully connected to MongoDB');
  return Promise.all([
    Category.countDocuments(),
    Product.countDocuments()
  ]).then(async ([categoryCount, productCount]) => {
    if (categoryCount === 0 || productCount === 0) {
      console.log('Catalog is empty, seeding default products and categories...');
      await seedDatabase({ reset: true, connect: false, disconnect: false });
    }

    // Start server only after successful database connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✓ Server is running on port ${PORT}`);
    });
  });
})
.catch(err => {
    console.error('✗ Could not connect to MongoDB:', err);
    console.error('Error details:', {
        name: err.name,
        message: err.message,
        code: err.code
    });
    process.exit(1);
});

// Handle MongoDB connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Handle application termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB connection closure:', err);
    process.exit(1);
  }
}); 