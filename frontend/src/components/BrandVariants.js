import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function BrandVariants() {
  const { categorySlug, subcategorySlug, brandSlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://jaytraders-5.onrender.com/api/products`, {
          params: {
            category: subcategorySlug,
            brand: brandSlug,
          },
        });
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (subcategorySlug && brandSlug) {
      fetchProducts();
    }
  }, [subcategorySlug, brandSlug]);

  const handleQuantityChange = (productId, variantId, value) => {
    const newValue = Math.max(1, Math.min(100, value));
    setQuantities(prev => ({
      ...prev,
      [`${productId}-${variantId}`]: newValue,
    }));
  };

  const handleAddToCart = async (productId, variantId) => {
    try {
      const success = await addToCart(productId, variantId, 1);
      if (success) {
        toast.success('Product added to cart!');
      } else {
        toast.error('Failed to add product to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 text-lg font-medium">{error}</p>
        <Link
          to={`/category/${categorySlug}/${subcategorySlug}`}
          className="mt-4 inline-block text-yellow-600 hover:underline"
        >
          ← Back to Subcategory
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10">
        <Link
          to={`/category/${categorySlug}/${subcategorySlug}`}
          className="text-yellow-600 hover:underline text-sm"
        >
          ← Back to Subcategory
        </Link>
        <h1 className="text-3xl font-bold mt-3 capitalize">
          {brandSlug.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-600 mt-1">Browse and add your preferred variant sizes</p>
      </div>

      <div className="space-y-12">
        {products.map(product => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-xl p-6 border"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-500 mb-4">{product.description}</p>

            <div className="flex overflow-x-auto gap-6 pb-2">
              {product.variants.map(variant => {
                const key = `${product._id}-${variant._id}`;
                const quantity = quantities[key] || 1;

                return (
                  <div
                    key={variant._id}
                    className="min-w-[250px] max-w-xs border border-gray-200 rounded-lg p-4 flex-shrink-0 bg-gray-50 hover:bg-white transition"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Size: {variant.size}
                    </h3>
                    <p className="text-blue-600 text-xl font-bold mb-4">
                      Price: ₹{variant.price}
                    </p>

                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() =>
                            handleQuantityChange(product._id, variant._id, quantity - 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="px-4 text-gray-800">{quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(product._id, variant._id, quantity + 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product._id, variant._id)}
                      className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 