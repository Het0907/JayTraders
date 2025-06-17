import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronRight, Package, Tag, Info, Trash2, AlertTriangle } from 'lucide-react';

export default function RemoveItems() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const mainCategories = [
    {
      id: 'engineering-hardware',
      name: 'Engineering Hardware',
      description: 'Industrial and engineering equipment, tools, and hardware',
      icon: Package
    },
    {
      id: 'pharma-materials',
      name: 'Pharma Materials',
      description: 'Pharmaceutical materials and equipment',
      icon: Tag
    },
    {
      id: 'ibr-materials',
      name: 'IBR Materials',
      description: 'IBR materials and related products',
      icon: Info
    }
  ];

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchProducts = async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setSuccess('Product deleted successfully');
      // Refresh the products list
      fetchProducts(selectedCategory);
      setProductToDelete(null);
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Remove Items</h1>

        {!selectedCategory ? (
          // Show main categories
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mainCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-500 text-white mb-4">
                  <category.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h2>
                <p className="text-gray-600">{category.description}</p>
                <div className="mt-4 flex items-center text-yellow-600">
                  <span>Remove Products</span>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Show products for selected category
          <div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-6 text-yellow-600 hover:text-yellow-800 flex items-center"
            >
              <ChevronRight className="h-5 w-5 rotate-180 mr-1" />
              Back to Categories
            </button>

            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
                {success}
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">Loading products...</div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {mainCategories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                </div>
                <div className="divide-y">
                  {products.map((product) => (
                    <div key={product._id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                          <div className="mt-2 flex items-center space-x-4">
                            <span className="text-sm text-gray-500">Brand: {product.brand}</span>
                            <span className="text-sm text-gray-500">
                              Variants: {product.variants.length}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setProductToDelete(product)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {productToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mx-auto mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
                Delete Product
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to delete "{productToDelete.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setProductToDelete(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(productToDelete._id)}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 