const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    isMainCategory: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Create index for faster queries
categorySchema.index({ slug: 1 });
categorySchema.index({ parentCategory: 1 });
categorySchema.index({ isMainCategory: 1 });

// Virtual for subcategories
categorySchema.virtual('subcategories', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parentCategory'
});

// Method to get all subcategories recursively
categorySchema.methods.getAllSubcategories = async function() {
    const subcategories = await this.model('Category').find({ parentCategory: this._id });
    let allSubcategories = [...subcategories];
    
    for (const subcategory of subcategories) {
        const nestedSubcategories = await subcategory.getAllSubcategories();
        allSubcategories = [...allSubcategories, ...nestedSubcategories];
    }
    
    return allSubcategories;
};

// Pre-save middleware to ensure slug is unique
categorySchema.pre('save', async function(next) {
    if (this.isModified('slug')) {
        const existingCategory = await this.constructor.findOne({ 
            slug: this.slug,
            _id: { $ne: this._id }
        });
        if (existingCategory) {
            throw new Error('Slug must be unique');
        }
    }
    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category; 