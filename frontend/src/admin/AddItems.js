import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTools, FaPills, FaIndustry, FaPlus, FaTrash } from 'react-icons/fa';

const AddItems = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [newSubcategoryDescription, setNewSubcategoryDescription] = useState('');
  const [newSubcategoryImage, setNewSubcategoryImage] = useState(null);
  const [newElementName, setNewElementName] = useState('');
  const [newElementPrice, setNewElementPrice] = useState('');
  const [newElementDescription, setNewElementDescription] = useState('');

  const mainCategories = [
    {
      id: 'engineering-hardware',
      name: 'Engineering Hardware',
      icon: <FaTools className="text-4xl mb-4" />,
      description: 'Tools, equipment, and hardware for engineering applications'
    },
    {
      id: 'pharma-materials',
      name: 'Pharma Materials',
      icon: <FaPills className="text-4xl mb-4" />,
      description: 'Pharmaceutical materials and supplies'
    },
    {
      id: 'ibr-materials',
      name: 'IBR Materials',
      icon: <FaIndustry className="text-4xl mb-4" />,
      description: 'Industrial boiler and related materials'
    }
  ];

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubcategory) {
      fetchElements(selectedSubcategory);
    }
  }, [selectedSubcategory]);

  const fetchSubcategories = async (categoryId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/categories/${categoryId}/subcategories`);
      setSubcategories(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch subcategories');
      console.error('Error fetching subcategories:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchElements = async (subcategoryId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/categories/subcategories/${subcategoryId}/elements`);
      setElements(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch elements');
      console.error('Error fetching elements:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    if (!newSubcategoryName) {
      setError('Please enter a subcategory name');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', newSubcategoryName);
      formData.append('slug', newSubcategoryName.toLowerCase().replace(/\s+/g, '-'));
      formData.append('description', newSubcategoryDescription);
      if (newSubcategoryImage) {
        formData.append('image', newSubcategoryImage);
      }
      
      const response = await axios.post(`http://localhost:5000/api/categories/${selectedCategory}/subcategories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubcategories([...subcategories, response.data]);
      setNewSubcategoryName('');
      setNewSubcategoryDescription('');
      setNewSubcategoryImage(null);
      setSuccess('Subcategory added successfully');
      setError('');
    } catch (err) {
      setError('Failed to add subcategory');
      console.error('Error adding subcategory:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddElement = async (e) => {
    e.preventDefault();
    if (!newElementName || !newElementPrice) {
      setError('Please enter both name and price');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`https://jaytraders-5.onrender.com/api/categories/subcategories/${selectedSubcategory}/elements`, {
        name: newElementName,
        price: Number(newElementPrice),
        description: newElementDescription
      });
      setElements([...elements, response.data]);
      setNewElementName('');
      setNewElementPrice('');
      setNewElementDescription('');
      setSuccess('Element added successfully');
      setError('');
    } catch (err) {
      setError('Failed to add element');
      console.error('Error adding element:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteElement = async (elementId) => {
    try {
      setLoading(true);
      await axios.delete(`https://jaytraders-5.onrender.com/api/products/${elementId}`);
      setElements(elements.filter(element => element._id !== elementId));
      setSuccess('Element deleted successfully');
      setError('');
    } catch (err) {
      setError('Failed to delete element');
      console.error('Error deleting element:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add Items</h1>

      {!selectedCategory ? (
        // Main Categories Selection
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="text-center">
                {category.icon}
                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : !selectedSubcategory ? (
        // Subcategories Selection
        <div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-6 text-yellow-600 hover:text-yellow-800"
          >
            ← Back to Categories
          </button>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {mainCategories.find(c => c.id === selectedCategory)?.name} Subcategories
            </h2>

            {/* Add Subcategory Form */}
            <form onSubmit={handleAddSubcategory} className="mb-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                  placeholder="Enter subcategory name"
                  className="flex-1 p-2 border rounded"
                />
              </div>
              <div className="mt-4">
                <textarea
                  value={newSubcategoryDescription}
                  onChange={(e) => setNewSubcategoryDescription(e.target.value)}
                  placeholder="Enter subcategory description (optional)"
                  rows="3"
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
              <div className="mt-4">
                <label htmlFor="subcategory-image" className="block text-sm font-medium text-gray-700">Subcategory Image</label>
                <input
                  type="file"
                  id="subcategory-image"
                  onChange={(e) => setNewSubcategoryImage(e.target.files[0])}
                  className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Add Subcategory
                </button>
              </div>
            </form>

            {/* Subcategories List */}
            {loading ? (
              <div className="text-center py-4">Loading subcategories...</div>
            ) : error ? (
              <div className="text-red-600 py-4">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subcategories.map((subcategory) => (
                  <div
                    key={subcategory._id}
                    className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedSubcategory(subcategory._id)}
                  >
                    <h3 className="font-semibold">{subcategory.name}</h3>
                    {subcategory.description && (
                      <p className="text-sm text-gray-600 mt-1">{subcategory.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        // Elements Management
        <div>
          <button
            onClick={() => setSelectedSubcategory(null)}
            className="mb-6 text-yellow-600 hover:text-yellow-800"
          >
            ← Back to Subcategories
          </button>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {subcategories.find(s => s._id === selectedSubcategory)?.name} Elements
            </h2>

            {/* Add Element Form */}
            <form onSubmit={handleAddElement} className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  value={newElementName}
                  onChange={(e) => setNewElementName(e.target.value)}
                  placeholder="Element name"
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  value={newElementPrice}
                  onChange={(e) => setNewElementPrice(e.target.value)}
                  placeholder="Price"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  value={newElementDescription}
                  onChange={(e) => setNewElementDescription(e.target.value)}
                  placeholder="Description (optional)"
                  className="p-2 border rounded"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Add Element
                </button>
              </div>
            </form>

            {/* Elements List */}
            {loading ? (
              <div className="text-center py-4">Loading elements...</div>
            ) : error ? (
              <div className="text-red-600 py-4">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {elements.map((element) => (
                  <div key={element._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{element.name}</h3>
                        <p className="text-lg font-bold text-yellow-600">
                          ₹{element.price?.toLocaleString()}
                        </p>
                        {element.description && (
                          <p className="text-sm text-gray-600 mt-1">{element.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteElement(element._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {success && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg">
          {success}
        </div>
      )}
    </div>
  );
};

export default AddItems; 