const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false,
        min: 0
    },
    sku: {
        type: String,
        unique: true,
        sparse: true
    }
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: false,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: false
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    specifications: {
        type: Map,
        of: String
    },
    variants: [variantSchema],
    features: [String],
    image: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Create indexes for faster queries
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ 'variants.price': 1 });

// Virtual for getting the lowest price
productSchema.virtual('lowestPrice').get(function() {
    if (!this.variants || this.variants.length === 0) return null;
    return Math.min(...this.variants.map(v => v.price || 0));
});

// Virtual for getting the highest price
productSchema.virtual('highestPrice').get(function() {
    if (!this.variants || this.variants.length === 0) return null;
    return Math.max(...this.variants.map(v => v.price || 0));
});

// Pre-save middleware to ensure slug is unique
productSchema.pre('save', async function(next) {
    if (this.isModified('slug')) {
        const existingProduct = await this.constructor.findOne({ 
            slug: this.slug,
            _id: { $ne: this._id }
        });
        if (existingProduct) {
            throw new Error('Slug must be unique');
        }
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 