import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching products...');
      const response = await axios.get('http://localhost:5000/api/products');
      console.log('Products response:', response.data);
      setProducts(response.data);
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: err.config
      });
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to fetch products. Please check if the server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      console.log('Deleting product:', productId);
      const response = await axios.delete(`http://localhost:5000/api/products/${productId}`);
      console.log('Delete response:', response.data);
      
      if (response.data.message === 'Product deleted successfully') {
        setSuccess('Product deleted successfully');
        setProducts(products.filter(product => product._id !== productId));
      } else {
        setError('Failed to delete product');
      }
    } catch (err) {
      console.error('Delete error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    navigate(`/admin/edit-product/${product._id}`);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <div className="space-x-4">
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Refresh
          </button>
          <button
            onClick={() => navigate('/admin/add-product')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Product
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
          <p className="mt-2 text-sm">
            Please make sure the backend server is running at http://localhost:5000
          </p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Brand</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.brand}</td>
                  <td className="p-2">₹{product.variants[0]?.price?.toLocaleString() || 'N/A'}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 