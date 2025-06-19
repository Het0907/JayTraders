import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaStar, FaCheck } from 'react-icons/fa';
import { useCart } from './context/CartContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log('Fetching product with slug:', slug);
                const response = await axios.get(`https://jaytraders-5.onrender.com/api/products/${slug}`);
                console.log('Product response:', response.data);
                setProduct(response.data);
                if (response.data.variants && response.data.variants.length > 0) {
                    setSelectedVariant(response.data.variants[0]);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product:', {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status
                });
                setError(err.response?.data?.message || 'Failed to fetch product details');
                setLoading(false);
            }
        };

        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    const handleVariantChange = (variant) => {
        setSelectedVariant(variant);
        setQuantity(1);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= selectedVariant.stock) {
            setQuantity(value);
        }
    };

    const handleAddToCart = async () => {
        if (selectedVariant && quantity > 0) {
            try {
                const success = await addToCart(product._id, selectedVariant._id, quantity);
                if (success) {
                    // Show success message
                    toast.success('Product added to cart!');
                    // Reset quantity to 1 after successful add
                    setQuantity(1);
                } else {
                    toast.error('Failed to add product to cart. Please try again.');
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
                toast.error('Failed to add product to cart. Please try again.');
            }
        } else {
            toast.error('Please select a size and quantity');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-gray-500">Product not found</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                    {product.inStock ? (
                        <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                            In Stock
                        </span>
                    ) : (
                        <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                            Out of Stock
                        </span>
                    )}
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        {product.brand && (
                            <p className="text-2xl font-bold text-gray-800">
                                {product.brand}
                            </p>
                        )}
                        <p className="text-gray-600">{product.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900">Price</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            ₹{selectedVariant?.price?.toLocaleString() || 'Price not set'}
                        </p>
                    </div>

                    {/* Variants */}
                    {product.variants.length > 1 && (
                        <div className="space-y-2">
                            <h3 className="font-semibold">Select Size:</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.size}
                                        onClick={() => handleVariantChange(variant)}
                                        className={`px-4 py-2 border rounded-md ${
                                            selectedVariant?.size === variant.size
                                                ? 'border-blue-500 bg-blue-50 text-blue-600'
                                                : 'border-gray-300 hover:border-blue-500'
                                        }`}
                                    >
                                        {variant.size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity and Add to Cart */}
                    <div className="mt-8">
                        <div className="flex items-center space-x-4">
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Specifications */}
                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                        <div className="space-y-2">
                            <h3 className="font-semibold">Specifications:</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex items-center space-x-2">
                                        <FaCheck className="text-green-500" />
                                        <span className="text-gray-600">
                                            {key}: {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="font-semibold">Features:</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="text-gray-600">
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 