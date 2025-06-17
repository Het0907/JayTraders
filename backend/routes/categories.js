const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs').promises;

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

// Function to standardize image
async function standardizeImage(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .resize(800, 600, { // Standard size for all subcategory images
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            })
            .jpeg({ quality: 90 }) // Convert to JPEG with good quality
            .toFile(outputPath);
        
        // Delete the original file
        await fs.unlink(inputPath);
        
        return true;
    } catch (error) {
        console.error('Error standardizing image:', error);
        return false;
    }
}

// Test endpoint to verify all categories
router.get('/test', async (req, res) => {
    try {
        const mainCategories = await Category.find({ parentCategory: null });
        const allCategories = await Category.find({});
        res.json({
            mainCategories,
            allCategories,
            count: allCategories.length
        });
    } catch (err) {
        console.error('Error in test endpoint:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get all categories or filter by parent
router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.parentCategory) {
            query.parentCategory = req.query.parentCategory;
        } else if (req.query.parentCategorySlug) {
            // If parentCategorySlug is provided, find the parent category by slug first
            const parentCategory = await Category.findOne({ slug: req.query.parentCategorySlug });
            if (parentCategory) {
                query.parentCategory = parentCategory._id;
            } else {
                // If parent category not found by slug, return empty array
                return res.json([]);
            }
        }

        const categories = await Category.find(query).populate('parentCategory');
        res.json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get category by slug
router.get('/slug/:slug', async (req, res) => {
    try {
        console.log('Fetching category by slug:', req.params.slug); // Debug log
        const category = await Category.findOne({ slug: req.params.slug })
            .populate('parentCategory');
        
        if (!category) {
            console.log('Category not found for slug:', req.params.slug); // Debug log
            return res.status(404).json({ message: 'Category not found' });
        }
        
        console.log('Found category:', category); // Debug log
        res.json(category);
    } catch (err) {
        console.error('Error fetching category by slug:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate('parentCategory');
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        console.error('Error fetching category by ID:', err);
        res.status(500).json({ message: err.message });
    }
});

// Create category
router.post('/', async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            slug: req.body.slug,
            description: req.body.description,
            image: req.body.image,
            parentCategory: req.body.parentCategory
        });

        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        console.error('Error creating category:', err);
        res.status(400).json({ message: err.message });
    }
});

// Update category
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        let imagePath = category.image;

        if (req.file) {
            const originalPath = req.file.path;
            const standardizedPath = path.join('uploads', `standardized-${req.file.filename}`);
            
            // Standardize the image
            const success = await standardizeImage(originalPath, standardizedPath);
            
            if (success) {
                imagePath = `/uploads/standardized-${req.file.filename}`;
            } else {
                imagePath = `/uploads/${req.file.filename}`;
            }
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                slug: req.body.slug,
                description: req.body.description,
                image: imagePath,
                parentCategory: req.body.parentCategory,
                isMainCategory: req.body.isMainCategory,
                order: req.body.order,
                isActive: req.body.isActive
            },
            { new: true }
        );

        res.json(updatedCategory);
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Check if category has subcategories
        const hasSubcategories = await Category.exists({ parentCategory: category._id });
        if (hasSubcategories) {
            return res.status(400).json({ message: 'Cannot delete category with subcategories' });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted' });
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get subcategories for a main category
router.get('/:mainCategorySlug/subcategories', async (req, res) => {
    try {
        const mainCategory = await Category.findOne({ slug: req.params.mainCategorySlug });
        if (!mainCategory) {
            return res.status(404).json({ message: 'Main category not found' });
        }

        const subcategories = await Category.find({ parentCategory: mainCategory._id });
        res.json(subcategories);
    } catch (err) {
        console.error('Error fetching subcategories:', err);
        res.status(500).json({ message: err.message });
    }
});

// Add subcategory to a main category
router.post('/:mainCategorySlug/subcategories', upload.single('image'), async (req, res) => {
    try {
        const mainCategory = await Category.findOne({ slug: req.params.mainCategorySlug });
        if (!mainCategory) {
            return res.status(404).json({ message: 'Main category not found' });
        }

        console.log('Backend: Received subcategory add request.');
        console.log('Backend: req.body =', req.body);
        console.log('Backend: req.file =', req.file);

        let imagePath = req.body.image || mainCategory.image;

        if (req.file) {
            const originalPath = req.file.path;
            const standardizedPath = path.join('uploads', `standardized-${req.file.filename}`);
            
            // Standardize the image
            const success = await standardizeImage(originalPath, standardizedPath);
            
            if (success) {
                imagePath = `/uploads/standardized-${req.file.filename}`;
            } else {
                imagePath = `/uploads/${req.file.filename}`;
            }
        }

        const subcategory = new Category({
            name: req.body.name,
            slug: req.body.slug,
            description: req.body.description || '',
            image: imagePath,
            parentCategory: mainCategory._id,
            isMainCategory: false
        });

        const newSubcategory = await subcategory.save();
        res.status(201).json(newSubcategory);
    } catch (err) {
        console.error('Error adding subcategory:', err);
        res.status(400).json({ message: err.message });
    }
});

// Get brands for a subcategory
router.get('/subcategories/:subcategoryId/brands', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.subcategoryId })
            .distinct('brand');
        res.json(products);
    } catch (err) {
        console.error('Error fetching brands:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get variants for a subcategory
router.get('/subcategories/:subcategoryId/variants', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.subcategoryId })
            .select('variants');
        
        // Extract unique variants
        const variants = products.reduce((acc, product) => {
            product.variants.forEach(variant => {
                if (!acc.some(v => v.name === variant.name)) {
                    acc.push({
                        name: variant.name,
                        price: variant.price,
                        stock: variant.stock
                    });
                }
            });
            return acc;
        }, []);

        res.json(variants);
    } catch (err) {
        console.error('Error fetching variants:', err);
        res.status(500).json({ message: err.message });
    }
});

// Add brand to a subcategory
router.post('/subcategories/:subcategoryId/brands', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Brand name is required' });
        }

        // Check if brand already exists
        const existingBrand = await Product.findOne({
            category: req.params.subcategoryId,
            brand: name
        });

        if (existingBrand) {
            return res.status(400).json({ message: 'Brand already exists in this subcategory' });
        }

        // Create a new product with the brand
        const product = new Product({
            name: `${name} Product`,
            slug: `${name.toLowerCase().replace(/\s+/g, '-')}-product`,
            brand: name,
            category: req.params.subcategoryId,
            variants: [{ size: 'Default', price: 0, stock: 0 }]
        });

        const newProduct = await product.save();
        res.status(201).json({ name: newProduct.brand });
    } catch (err) {
        console.error('Error adding brand:', err);
        res.status(400).json({ message: err.message });
    }
});

// Add variant to a subcategory
router.post('/subcategories/:subcategoryId/variants', async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        if (!name || price === undefined || stock === undefined) {
            return res.status(400).json({ message: 'Variant name, price, and stock are required' });
        }

        // Create a new product with the variant
        const product = new Product({
            name: `${name} Variant`,
            slug: `${name.toLowerCase().replace(/\s+/g, '-')}-variant`,
            brand: 'Generic',
            category: req.params.subcategoryId,
            variants: [{ size: name, price: Number(price), stock: Number(stock) }]
        });

        const newProduct = await product.save();
        res.status(201).json(newProduct.variants[0]);
    } catch (err) {
        console.error('Error adding variant:', err);
        res.status(400).json({ message: err.message });
    }
});

// Get elements for a subcategory
router.get('/subcategories/:subcategoryId/elements', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.subcategoryId })
            .select('name price description variants');
        
        // Transform products into elements format
        const elements = products.map(product => ({
            _id: product._id,
            name: product.name,
            price: product.variants[0]?.price || 0,
            description: product.description || ''
        }));

        res.json(elements);
    } catch (err) {
        console.error('Error fetching elements:', err);
        res.status(500).json({ message: err.message });
    }
});

// Add element to a subcategory
router.post('/subcategories/:subcategoryId/elements', async (req, res) => {
    try {
        const { name, price, description } = req.body;
        if (!name || price === undefined) {
            return res.status(400).json({ message: 'Element name and price are required' });
        }

        // Create a new product with the element details
        const product = new Product({
            name: name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            description: description || '',
            brand: 'Generic',
            category: req.params.subcategoryId,
            variants: [{ 
                size: 'Default', 
                price: Number(price),
                stock: 999999 // Set a very high number to indicate unlimited stock
            }]
        });

        const newProduct = await product.save();
        
        // Return the element in the expected format
        res.status(201).json({
            _id: newProduct._id,
            name: newProduct.name,
            price: newProduct.variants[0].price,
            description: newProduct.description
        });
    } catch (err) {
        console.error('Error adding element:', err);
        res.status(400).json({ message: err.message });
    }
});

module.exports = router; 