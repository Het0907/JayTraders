const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const mongoose = require('mongoose');

// Get all products with filtering
router.get('/', async (req, res) => {
    try {
        let query = {};
        
        // Filter by category
        if (req.query.category) {
            const category = await Category.findOne({ slug: req.query.category });
            if (category) {
                query.category = category._id;
            }
        }

        // Filter by brand
        if (req.query.brand) {
            query.brand = req.query.brand;
        }

        // Filter by price range
        if (req.query.minPrice || req.query.maxPrice) {
            query['variants.price'] = {};
            if (req.query.minPrice) {
                query['variants.price'].$gte = Number(req.query.minPrice);
            }
            if (req.query.maxPrice) {
                query['variants.price'].$lte = Number(req.query.maxPrice);
            }
        }

        const products = await Product.find(query)
            .populate('category')
            .sort({ order: 1 });

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Get products by category ID (and its subcategories)
router.get('/category/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        
        let categoryQuery = {};
        if (mongoose.Types.ObjectId.isValid(categoryId)) {
            categoryQuery._id = categoryId;
        } else {
            categoryQuery.slug = categoryId;
        }

        // Find the main category by ID or slug
        const mainCategory = await Category.findOne(categoryQuery);
        if (!mainCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Get all subcategories recursively (if getAllSubcategories method exists)
        let categoryIds = [mainCategory._id];
        if (typeof mainCategory.getAllSubcategories === 'function') {
            const subcategories = await mainCategory.getAllSubcategories();
            categoryIds = [...categoryIds, ...subcategories.map(sub => sub._id)];
        } else {
            console.warn("Category.prototype.getAllSubcategories is not defined. Only fetching products directly under the main category.");
        }

        const products = await Product.find({ category: { $in: categoryIds } })
            .populate('category', 'name slug')
            .lean();

        // Add virtual fields
        const productsWithVirtuals = products.map(product => ({
            ...product,
            lowestPrice: product.variants && product.variants.length > 0 ? Math.min(...product.variants.map(v => v.price || 0)) : 0,
            highestPrice: product.variants && product.variants.length > 0 ? Math.max(...product.variants.map(v => v.price || 0)) : 0,
        }));

        res.json(productsWithVirtuals);
    } catch (err) {
        console.error(`Error in /api/products/category/${req.params.categoryId}:`, err);
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

// Get single product
router.get('/:slug', async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
            .populate('category', 'name slug')
            .lean();

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Add virtual fields
        const productWithVirtuals = {
            ...product,
            lowestPrice: Math.min(...product.variants.map(v => v.price)),
            highestPrice: Math.max(...product.variants.map(v => v.price)),
            inStock: product.variants.some(v => v.stock > 0),
            totalStock: product.variants.reduce((sum, v) => sum + v.stock, 0)
        };

        res.json(productWithVirtuals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create product
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        brand: req.body.brand,
        category: req.body.category,
        specifications: req.body.specifications,
        variants: req.body.variants,
        features: req.body.features,
        image: req.body.image,
        order: req.body.order
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update product
router.patch('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        Object.keys(req.body).forEach(key => {
            product[key] = req.body[key];
        });

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' });
    }
});

module.exports = router; 