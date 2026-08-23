const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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

// Rename subcategory (Updates all products in category having this name)
router.put('/subcategories/rename', async (req, res) => {
    try {
        const { categoryId, oldName, newName } = req.body;
        if (!categoryId || !oldName || !newName) {
            return res.status(400).json({ message: 'categoryId, oldName, and newName are required' });
        }

        const mainCat = mongoose.Types.ObjectId.isValid(categoryId)
            ? await Category.findById(categoryId)
            : await Category.findOne({ slug: categoryId });

        const catId = mainCat ? mainCat._id : categoryId;

        // Update all products in this category with name == oldName
        const productResult = await Product.updateMany(
            { category: catId, name: oldName.trim() },
            { $set: { name: newName.trim() } }
        );

        // Update child Category document if exists
        const newSlug = newName.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
        await Category.updateMany(
            { parentCategory: catId, name: oldName.trim() },
            { $set: { name: newName.trim(), slug: newSlug } }
        );

        res.json({
            message: 'Subcategory renamed successfully',
            matchedCount: productResult.matchedCount || productResult.n || 0,
            modifiedCount: productResult.modifiedCount || productResult.nModified || 0,
            newName: newName.trim()
        });
    } catch (err) {
        console.error('Error renaming subcategory:', err);
        res.status(500).json({ message: err.message });
    }
});

// Delete subcategory (Deletes all products under this subcategory)
const handleDeleteSubcategory = async (req, res) => {
    try {
        const categoryId = req.body?.categoryId || req.query?.categoryId;
        const subcategoryName = req.body?.subcategoryName || req.query?.subcategoryName || req.body?.name || req.query?.name;

        if (!categoryId || !subcategoryName) {
            return res.status(400).json({ message: 'categoryId and subcategoryName are required' });
        }

        const mainCat = mongoose.Types.ObjectId.isValid(categoryId)
            ? await Category.findById(categoryId)
            : await Category.findOne({ slug: categoryId });

        const catId = mainCat ? mainCat._id : categoryId;

        // Delete all products with this category and subcategory name
        const deletedProducts = await Product.deleteMany({
            category: catId,
            name: subcategoryName.trim()
        });

        // Delete child category document if exists
        await Category.deleteMany({
            parentCategory: catId,
            name: subcategoryName.trim()
        });

        res.json({
            message: `Deleted subcategory "${subcategoryName}" and ${deletedProducts.deletedCount || 0} associated brand products`,
            deletedCount: deletedProducts.deletedCount || 0
        });
    } catch (err) {
        console.error('Error deleting subcategory:', err);
        res.status(500).json({ message: err.message });
    }
};

router.post('/subcategories/delete', handleDeleteSubcategory);
router.delete('/subcategories/delete', handleDeleteSubcategory);
router.delete('/subcategories', handleDeleteSubcategory);

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
        const category = await Category.findOne({ slug: req.params.slug })
            .populate('parentCategory');
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
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
            parentCategory: req.body.parentCategory || null,
            isMainCategory: !req.body.parentCategory
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

        let imagePath = req.body.image !== undefined ? req.body.image : category.image;

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

        const updateData = {};
        if (req.body.name !== undefined) updateData.name = req.body.name;
        if (req.body.slug !== undefined) updateData.slug = req.body.slug;
        if (req.body.description !== undefined) updateData.description = req.body.description;
        if (imagePath !== undefined) updateData.image = imagePath;
        if (req.body.parentCategory !== undefined) updateData.parentCategory = req.body.parentCategory || null;
        if (req.body.isMainCategory !== undefined) updateData.isMainCategory = req.body.isMainCategory;
        if (req.body.order !== undefined) updateData.order = req.body.order;
        if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(updatedCategory);
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete category (with cascade delete for subcategories and products)
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Find child subcategories if any
        const subcategories = await Category.find({ parentCategory: category._id });
        const subcategoryIds = subcategories.map(s => s._id);
        const allCatIds = [category._id, ...subcategoryIds];

        // Delete all associated products
        const deletedProducts = await Product.deleteMany({ category: { $in: allCatIds } });

        // Delete child categories
        await Category.deleteMany({ parentCategory: category._id });

        // Delete main category
        await Category.findByIdAndDelete(req.params.id);

        res.json({ 
            message: `Category "${category.name}" and all associated products deleted successfully`,
            deletedProductsCount: deletedProducts.deletedCount || 0
        });
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