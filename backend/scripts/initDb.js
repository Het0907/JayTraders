require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');

const mainCategories = [
    {
        name: 'Engineering Hardware',
        slug: 'engineering-hardware',
        description: 'High-quality engineering hardware and industrial supplies',
        image: '/images/engineering.jpg'
    },
    {
        name: 'Pharma Materials',
        slug: 'pharma-materials',
        description: 'Pharmaceutical grade materials and equipment',
        image: '/images/pharma.jpg'
    },
    {
        name: 'IBR Materials',
        slug: 'ibr-materials',
        description: 'IBR certified materials and equipment',
        image: '/images/ibr.jpg'
    }
];

// Sample products
const products = {
    'welding-rods': [
        {
            name: 'Premium Welding Rod',
            slug: 'premium-welding-rod-6013',
            brand: 'Mangalam',
            description: 'High-quality welding rod for general purpose welding',
            variants: [
                {
                    size: '2.5mm',
                    price: 299,
                    stock: 100
                },
                {
                    size: '3.2mm',
                    price: 399,
                    stock: 75
                }
            ],
            features: [
                'Easy to use',
                'Strong weld strength',
                'Smooth arc'
            ],
            image: '/images/products/welding-rod-6013.jpg'
        },
        {
            name: 'Stainless Steel Welding Rod 308L',
            slug: 'stainless-steel-welding-rod-308l',
            description: 'Premium stainless steel welding rod for corrosion resistance',
            brand: 'Superon',
            variants: [
                {
                    size: '2.5mm',
                    price: 499,
                    stock: 50
                },
                {
                    size: '3.2mm',
                    price: 599,
                    stock: 40
                }
            ],
            features: [
                'Corrosion resistant',
                'High tensile strength',
                'Excellent arc stability'
            ],
            image: '/images/products/welding-rod-308l.jpg'
        }
    ],
    'fasteners-fixings': [
        {
            name: 'Stainless Steel Hex Bolts',
            slug: 'stainless-steel-hex-bolts',
            description: 'High-quality stainless steel hex bolts for industrial use',
            brand: 'JayTraders',
            specifications: {
                material: 'Stainless Steel 304',
                finish: 'Polished',
                thread: 'Metric'
            },
            variants: [
                {
                    size: 'M6',
                    price: 5,
                    stock: 1000
                },
                {
                    size: 'M8',
                    price: 8,
                    stock: 1000
                },
                {
                    size: 'M10',
                    price: 12,
                    stock: 800
                }
            ],
            features: [
                'Corrosion resistant',
                'High tensile strength',
                'ISO certified'
            ],
            image: '/images/products/hex-bolts.jpg'
        },
        {
            name: 'Heavy Duty Anchor Bolts',
            slug: 'heavy-duty-anchor-bolts',
            description: 'Industrial grade anchor bolts for concrete applications',
            brand: 'JayTraders',
            specifications: {
                material: 'Carbon Steel',
                finish: 'Hot Dip Galvanized',
                type: 'Wedge Anchor'
            },
            variants: [
                {
                    size: 'M12',
                    price: 25,
                    stock: 500
                },
                {
                    size: 'M16',
                    price: 35,
                    stock: 400
                }
            ],
            features: [
                'High load capacity',
                'Weather resistant',
                'Easy installation'
            ],
            image: '/images/products/anchor-bolts.jpg'
        }
    ],
    'power-tools': [
        {
            name: 'Professional Angle Grinder',
            slug: 'professional-angle-grinder',
            description: 'Heavy-duty angle grinder for metal and concrete work',
            brand: 'JayTraders',
            specifications: {
                power: '850W',
                discSize: '4 inch',
                speed: '11000 RPM'
            },
            variants: [
                {
                    size: '4 inch',
                    price: 2499,
                    stock: 30
                },
                {
                    size: '5 inch',
                    price: 2999,
                    stock: 25
                }
            ],
            features: [
                'Powerful motor',
                'Anti-vibration handle',
                'Quick disc change'
            ],
            image: '/images/products/angle-grinder.jpg'
        }
    ],
    'lab-equipment': [
        {
            name: 'Digital pH Meter',
            slug: 'digital-ph-meter',
            description: 'Precision digital pH meter for laboratory use',
            brand: 'JayTraders',
            specifications: {
                range: '0-14 pH',
                accuracy: '±0.01 pH',
                resolution: '0.01 pH'
            },
            variants: [
                {
                    size: 'Standard',
                    price: 4999,
                    stock: 20
                },
                {
                    size: 'Professional',
                    price: 7999,
                    stock: 15
                }
            ],
            features: [
                'Auto calibration',
                'Temperature compensation',
                'Data logging'
            ],
            image: '/images/products/ph-meter.jpg'
        }
    ],
    'roofing-materials': [
        {
            name: 'Metal Roofing Sheets',
            slug: 'metal-roofing-sheets',
            description: 'High-quality metal roofing sheets for industrial buildings',
            brand: 'JayTraders',
            specifications: {
                material: 'Galvalume',
                thickness: '0.5mm',
                width: '1000mm'
            },
            variants: [
                {
                    size: '3m',
                    price: 1299,
                    stock: 100
                },
                {
                    size: '4m',
                    price: 1599,
                    stock: 80
                }
            ],
            features: [
                'Weather resistant',
                'Long lifespan',
                'Easy installation'
            ],
            image: '/images/products/roofing-sheets.jpg'
        }
    ],
    'pharma-valves': [
        {
            name: 'Sanitary Ball Valve',
            slug: 'sanitary-ball-valve',
            description: 'High-quality sanitary ball valve for pharmaceutical applications',
            brand: 'JayTraders',
            specifications: {
                material: '316L Stainless Steel',
                connection: 'Tri-clamp',
                pressure: '10 Bar'
            },
            variants: [
                {
                    size: '1 inch',
                    price: 2499,
                    stock: 50
                },
                {
                    size: '1.5 inch',
                    price: 3499,
                    stock: 40
                },
                {
                    size: '2 inch',
                    price: 4499,
                    stock: 30
                }
            ],
            features: [
                'Sanitary grade',
                'Easy to clean',
                'Zero dead space'
            ],
            image: '/images/products/sanitary-valve.jpg'
        },
        {
            name: 'Diaphragm Valve',
            slug: 'diaphragm-valve',
            description: 'Premium diaphragm valve for sterile applications',
            brand: 'JayTraders',
            specifications: {
                material: '316L Stainless Steel',
                connection: 'Tri-clamp',
                pressure: '6 Bar'
            },
            variants: [
                {
                    size: '1 inch',
                    price: 3999,
                    stock: 30
                },
                {
                    size: '1.5 inch',
                    price: 4999,
                    stock: 25
                }
            ],
            features: [
                'Sterile design',
                'No product contact',
                'Easy maintenance'
            ],
            image: '/images/products/diaphragm-valve.jpg'
        }
    ],
    'pharma-pipes': [
        {
            name: 'Sanitary Pipe',
            slug: 'sanitary-pipe',
            description: 'High-quality sanitary pipe for pharmaceutical industry',
            brand: 'JayTraders',
            specifications: {
                material: '316L Stainless Steel',
                finish: 'Electropolished',
                diameter: '1 inch'
            },
            variants: [
                {
                    size: '1 meter',
                    price: 1999,
                    stock: 100
                },
                {
                    size: '2 meter',
                    price: 3499,
                    stock: 80
                },
                {
                    size: '3 meter',
                    price: 4999,
                    stock: 60
                }
            ],
            features: [
                'Sanitary grade',
                'Smooth surface',
                'Corrosion resistant'
            ],
            image: '/images/products/sanitary-pipe.jpg'
        }
    ],
    'ibr-pipes': [
        {
            name: 'IBR Certified Pipe',
            slug: 'ibr-certified-pipe',
            description: 'High-quality IBR certified pipe for industrial applications',
            brand: 'JayTraders',
            specifications: {
                material: 'Carbon Steel',
                standard: 'IS 1239',
                pressure: '20 Bar'
            },
            variants: [
                {
                    size: '1 inch',
                    price: 299,
                    stock: 200
                },
                {
                    size: '1.5 inch',
                    price: 399,
                    stock: 150
                },
                {
                    size: '2 inch',
                    price: 499,
                    stock: 100
                }
            ],
            features: [
                'IBR certified',
                'High pressure rating',
                'Durable construction'
            ],
            image: '/images/products/ibr-pipe.jpg'
        }
    ],
    'ibr-pressure-plates': [
        {
            name: 'Pressure Vessel Plate',
            slug: 'pressure-vessel-plate',
            description: 'IBR certified pressure vessel plate for industrial boilers',
            brand: 'JayTraders',
            specifications: {
                material: 'SA 516 Gr. 70',
                thickness: '12mm',
                width: '2000mm'
            },
            variants: [
                {
                    size: '6m x 2m',
                    price: 49999,
                    stock: 10
                },
                {
                    size: '8m x 2m',
                    price: 64999,
                    stock: 8
                }
            ],
            features: [
                'IBR certified',
                'High strength',
                'Temperature resistant'
            ],
            image: '/images/products/pressure-plate.jpg'
        }
    ]
};

async function initializeDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully');

        // Clear existing categories
        await Category.deleteMany({});
        await Product.deleteMany({});
        console.log('Cleared existing categories');

        // Create main categories
        const createdCategories = await Category.insertMany(mainCategories);
        console.log('Created main categories:', createdCategories.map(cat => cat.name));

        // Create subcategories for Engineering Hardware
        const engineeringHardware = createdCategories.find(cat => cat.slug === 'engineering-hardware');
        if (engineeringHardware) {
            const engineeringSubcategories = [
                {
                    name: 'Welding Rods',
                    slug: 'welding-rods',
                    description: 'High-quality welding rods for various applications',
                    image: '/images/welding-rods.jpg',
                    parentCategory: engineeringHardware._id
                },
                {
                    name: 'Fasteners & Fixings',
                    slug: 'fasteners-fixings',
                    description: 'Industrial fasteners and fixing solutions',
                    image: '/images/fasteners.jpg',
                    parentCategory: engineeringHardware._id
                },
                {
                    name: 'Power Tools',
                    slug: 'power-tools',
                    description: 'Professional power tools and equipment',
                    image: '/images/power-tools.jpg',
                    parentCategory: engineeringHardware._id
                },
               
               
            ];
            await Category.insertMany(engineeringSubcategories);
            console.log('Created Engineering Hardware subcategories');
        }

        // Create subcategories for Pharma Materials
        const pharmaMaterials = createdCategories.find(cat => cat.slug === 'pharma-materials');
        if (pharmaMaterials) {
            const pharmaSubcategories = [
                {
                    name: 'Pharma Valves',
                    slug: 'pharma-valves',
                    description: 'Pharmaceutical grade valves and fittings',
                    image: '/images/pharma-valves.jpg',
                    parentCategory: pharmaMaterials._id
                },
                {
                    name: 'Pharma Pipes',
                    slug: 'pharma-pipes',
                    description: 'Sanitary grade pipes for pharmaceutical industry',
                    image: '/images/pharma-pipes.jpg',
                    parentCategory: pharmaMaterials._id
                }
            ];
            await Category.insertMany(pharmaSubcategories);
            console.log('Created Pharma Materials subcategories');
        }

        // Create subcategories for IBR Materials
        const ibrMaterials = createdCategories.find(cat => cat.slug === 'ibr-materials');
        if (ibrMaterials) {
            const ibrSubcategories = [
                {
                    name: 'IBR Pipes',
                    slug: 'ibr-pipes',
                    description: 'IBR certified pipes and fittings',
                    image: '/images/ibr-pipes.jpg',
                    parentCategory: ibrMaterials._id
                },
                {
                    name: 'IBR Pressure Plates',
                    slug: 'ibr-pressure-plates',
                    description: 'IBR certified pressure vessel plates',
                    image: '/images/ibr-plates.jpg',
                    parentCategory: ibrMaterials._id
                }
            ];
            await Category.insertMany(ibrSubcategories);
            console.log('Created IBR Materials subcategories');
        }

        // Create products
        for (const [categorySlug, categoryProducts] of Object.entries(products)) {
            const category = await Category.findOne({ slug: categorySlug });
            if (category) {
                console.log(`Creating products for category: ${category.name}`);
                for (const product of categoryProducts) {
                    const newProduct = await Product.create({
                        ...product,
                        category: category._id
                    });
                    console.log(`Created product: ${newProduct.name}`);
                }
            } else {
                console.log(`Category not found for slug: ${categorySlug}`);
            }
        }
        console.log('Created products');

        console.log('Database initialization completed successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

initializeDatabase(); 