require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

async function testDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully');

        // Test fetching all categories
        const categories = await Category.find({});
        console.log('\nAll Categories:');
        console.log(JSON.stringify(categories, null, 2));

        // Test fetching main categories (those without parent)
        const mainCategories = await Category.find({ parentCategory: null });
        console.log('\nMain Categories:');
        console.log(JSON.stringify(mainCategories, null, 2));

        // Test fetching subcategories for each main category
        for (const category of mainCategories) {
            const subcategories = await Category.find({ parentCategory: category._id });
            console.log(`\nSubcategories for ${category.name}:`);
            console.log(JSON.stringify(subcategories, null, 2));
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

testDatabase(); 