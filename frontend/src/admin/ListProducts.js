import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronRight, Package, Tag, Info, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import API_ENDPOINTS from '../config/api';

export default function ListProducts() {
  console.log('ListProducts component mounted');

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [editSubcategoryName, setEditSubcategoryName] = useState('');
  const [editSubcategoryImage, setEditSubcategoryImage] = useState('');

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
      console.log('Selected main category:', selectedCategory);
      fetchSubcategories(selectedCategory);
      fetchProducts(selectedCategory, null);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubcategory) {
      console.log('Selected subcategory:', selectedSubcategory);
      fetchProducts(null, selectedSubcategory);
    } else if (selectedCategory && !selectedSubcategory) {
      fetchProducts(selectedCategory, null);
    }
  }, [selectedSubcategory, selectedCategory]);

  const fetchSubcategories = async (parentSlug) => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.BASE_URL}/api/categories?parentCategorySlug=${parentSlug}`);
      setSubcategories(response.data);
      console.log('Fetched subcategories:', response.data);
    } catch (err) {
      console.error('Error fetching subcategories:', err);
      setSubcategories([]);
    }
  };

  const fetchProducts = async (categorySlug, subcategorySlug) => {
    setLoading(true);
    setError(null);
    try {
      let categoryIdToFetch = null;
      if (subcategorySlug) {
        console.log('Fetching category for subcategory slug:', subcategorySlug);
        const subcategoryResponse = await axios.get(`${API_ENDPOINTS.BASE_URL}/api/categories/slug/${subcategorySlug}`);
        console.log('Subcategory response:', subcategoryResponse.data);
        categoryIdToFetch = subcategoryResponse.data._id;
      } else if (categorySlug) {
        console.log('Fetching category for main category slug:', categorySlug);
        const categoryResponse = await axios.get(`${API_ENDPOINTS.BASE_URL}/api/categories/slug/${categorySlug}`);
        console.log('Category response:', categoryResponse.data);
        categoryIdToFetch = categoryResponse.data._id;
      }

      if (!categoryIdToFetch) {
        console.error('No category ID found for:', { categorySlug, subcategorySlug });
        setError('Could not determine category ID to fetch products');
        setLoading(false);
        return;
      }

      console.log('Fetching products for categoryId:', categoryIdToFetch);
      const productsResponse = await axios.get(`${API_ENDPOINTS.BASE_URL}/api/products/category/${categoryIdToFetch}`);
      console.log('Products response:', productsResponse.data);
      setProducts(productsResponse.data);
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSubcategories([]);
    setProducts([]);
  };

  const handleBackToMainCategory = () => {
    setSelectedSubcategory(null);
    setProducts([]);
  };

  const handleDeleteSubcategory = async (e, subcategoryId, subcategoryName) => {
    e.preventDefault(); // Prevent button click from triggering category selection
    if (!window.confirm(`Are you sure you want to delete the subcategory "${subcategoryName}"?`)) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const response = await axios.delete(`${API_ENDPOINTS.BASE_URL}/api/categories/${subcategoryId}`);
      
      if (response.status === 200) {
        setSuccess(`Subcategory "${subcategoryName}" deleted successfully.`);
        // After deletion, re-fetch subcategories for the current main category
        fetchSubcategories(selectedCategory);
        // If the deleted subcategory was currently selected, clear product list
        if (selectedSubcategory === subcategoryId) {
          setSelectedSubcategory(null);
          setProducts([]);
        } else {
          // Otherwise, refresh products for the current category/subcategory selection
          fetchProducts(selectedCategory, selectedSubcategory);
        }
      } else {
        setError(response.data.message || `Failed to delete subcategory "${subcategoryName}".`);
      }
    } catch (err) {
      console.error('Error deleting subcategory:', err);
      setError(err.response?.data?.message || 'Failed to delete subcategory. Check if it has products or subcategories.');
    } finally {
      setLoading(false);
      // Clear success/error messages after a few seconds
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
    }
  };

  const handleEditSubcategory = (subcategory) => {
    setEditingSubcategory(subcategory);
    setEditSubcategoryName(subcategory.name);
    setEditSubcategoryImage(subcategory.image || '');
  };

  const handleUpdateSubcategory = async () => {
    try {
      console.log('Updating subcategory with data:', {
        name: editSubcategoryName,
        image: editSubcategoryImage
      });
      
      const response = await axios.put(`${API_ENDPOINTS.BASE_URL}/api/categories/${editingSubcategory._id}`, {
        name: editSubcategoryName,
        image: editSubcategoryImage,
      });
      
      console.log('Update response:', response.data);
      
      setEditingSubcategory(null);
      setEditSubcategoryName('');
      setEditSubcategoryImage('');
      fetchSubcategories(selectedCategory);
      toast.success('Subcategory updated successfully');
    } catch (error) {
      console.error('Error updating subcategory:', error);
      toast.error(error.response?.data?.message || 'Failed to update subcategory');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">List Products</h1>

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
                  <span>View Products</span>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Show products for selected category or subcategory
          <div>
            <button
              onClick={selectedSubcategory ? handleBackToMainCategory : handleBackToCategories}
              className="mb-6 text-yellow-600 hover:text-yellow-800 flex items-center"
            >
              <ChevronRight className="h-5 w-5 rotate-180 mr-1" />
              {selectedSubcategory ? 'Back to ' + mainCategories.find(c => c.id === selectedCategory)?.name + ' Categories' : 'Back to Main Categories'}
            </button>

            {!selectedSubcategory && subcategories.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Subcategories:</h3>
                <div className="flex flex-wrap gap-3">
                  {subcategories.map(sub => (
                    <div key={sub._id} className="flex items-center gap-2">
                      <span className="text-gray-700">{sub.name}</span>
                      <button
                        onClick={() => handleEditSubcategory(sub)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteSubcategory(e, sub._id, sub.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">Loading products...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">{error}</div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {selectedSubcategory ? subcategories.find(s => s.slug === selectedSubcategory)?.name : mainCategories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                </div>
                <div className="divide-y">
                  {products.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      No products found in this category
                    </div>
                  ) : (
                    products.map((product) => (
                      <div key={product._id} className="p-4 border rounded-lg">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                        <p className="text-sm text-gray-600">
                          Price: ₹{product.variants[0]?.price?.toLocaleString() || 'N/A'}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {editingSubcategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit Subcategory</h2>
              <input
                type="text"
                value={editSubcategoryName}
                onChange={(e) => setEditSubcategoryName(e.target.value)}
                className="border p-2 rounded w-full mb-4"
              />
              <input
                type="text"
                value={editSubcategoryImage}
                onChange={(e) => setEditSubcategoryImage(e.target.value)}
                placeholder="Image URL"
                className="border p-2 rounded w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingSubcategory(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSubcategory}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 