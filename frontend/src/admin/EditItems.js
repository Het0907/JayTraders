import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ChevronRight, Package, Tag, Info, Edit2, Save, X, PlusCircle, MinusCircle } from 'lucide-react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function EditItems() {
  console.log('EditItems component mounted');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState(null);

  // Image cropping states
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null); // Ref for the hidden canvas to draw cropped image
  const [upImg, setUpImg] = useState(); // Holds the original image selected by user
  const [crop, setCrop] = useState(); // Crop object for react-image-crop
  const [completedCrop, setCompletedCrop] = useState(null); // The final cropped area

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
      console.log('Selected category for editing:', selectedCategory);
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchProducts = async (categorySlug) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching category ID for slug:', categorySlug);
      const categoryResponse = await axios.get(`https://jaytraders-5.onrender.com/api/categories/slug/${categorySlug}`);
      
      if (!categoryResponse.data || !categoryResponse.data._id) {
        console.error('Category data or ID is missing for slug:', categorySlug, categoryResponse.data);
        setError('Failed to get category ID for products');
        setLoading(false);
        return;
      }

      const categoryId = categoryResponse.data._id;
      console.log('Extracted Category ID for products:', categoryId);

      console.log('Fetching products for category ID:', categoryId);
      const response = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`);
      console.log('Products fetched for editing:', response.data);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products for editing:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      brand: product.brand,
      image: product.image || '', // Initialize image field from product
      specifications: { ...product.specifications },
      variants: [...product.variants],
      features: [...product.features]
    });
    setUpImg(null); // Clear any previous image for new upload
    setCrop(undefined); // Clear any previous crop
    setCompletedCrop(null); // Clear any previous completed crop
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecificationChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: value
      }
    }));
  };

  const handleAddVariant = () => {
    setEditForm(prev => ({
      ...prev,
      variants: [...prev.variants, { size: '', price: 0, stock: 0 }]
    }));
  };

  const handleRemoveVariant = (index) => {
    setEditForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...editForm.variants];
    newVariants[index] = {
      ...newVariants[index],
      [field]: value
    };
    setEditForm(prev => ({
      ...prev,
      variants: newVariants
    }));
  };

  const handleAddFeature = () => {
    setEditForm(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const handleRemoveFeature = (index) => {
    setEditForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...editForm.features];
    newFeatures[index] = value;
    setEditForm(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  // Image handling functions for EditItems
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop react to the new image
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerCrop(makeAspectCrop({ unit: 'px', width: Math.min(width, height) * 0.8 }, 4 / 3, width, height), width, height));
  };

  const onCropComplete = (c) => {
    setCompletedCrop(c);
  };

  // Function to get the cropped image as a data URL (base64)
  const getCroppedImg = (image, crop, fileName) => {
    const canvas = previewCanvasRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to desired final size (800x600)
    canvas.width = 800;
    canvas.height = 600;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // As a base64 string
    return canvas.toDataURL('image/jpeg');
  };

  const handleImageCropAndSelect = async () => {
    if (completedCrop && imgRef.current) {
      const croppedImgBase64 = getCroppedImg(imgRef.current, completedCrop, 'edited-product-image.jpeg');
      setEditForm(prev => ({ ...prev, image: croppedImgBase64 }));
      setUpImg(null); // Clear original image to hide cropper
      setCompletedCrop(null); // Clear completed crop
    }
  };

  const handleSave = async () => {
    console.log('Attempting to save product with data:', editForm);
    console.log('Saving product with ID:', editingProduct?._id);
    try {
      await axios.patch(`http://localhost:5000/api/products/${editingProduct._id}`, editForm, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Refresh the products list
      fetchProducts(selectedCategory);
      setEditingProduct(null);
      setEditForm(null);
      console.log('Product saved successfully!');
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Items</h1>

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
                  <span>Edit Products</span>
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

            {loading ? (
              <div className="text-center py-8">Loading products...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">{error}</div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {mainCategories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                </div>
                <div className="divide-y">
                  {products.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      No products found in this category.
                    </div>
                  ) : (
                    products.map((product) => (
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
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-900">
                              ₹{product.variants[0]?.price || 'N/A'}
                            </span>
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            >
                              <Edit2 className="h-5 w-5 mr-1" />
                              Edit
                            </button>
                          </div>
                        </div>
                        {/* Edit Form */}
                        {editingProduct?._id === product._id && (
                          <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
                            <h3 className="text-xl font-semibold mb-4">Edit Product: {editingProduct.name}</h3>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  value={editForm.name}
                                  onChange={handleInputChange}
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                  name="description"
                                  value={editForm.description}
                                  onChange={handleInputChange}
                                  rows="3"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                ></textarea>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Brand</label>
                                <input
                                  type="text"
                                  name="brand"
                                  value={editForm.brand}
                                  onChange={handleInputChange}
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                              </div>

                              {/* Image Upload and Crop for Edit */}
                              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h2 className="text-lg font-semibold mb-4">Product Image</h2>
                                <input type="file" accept="image/*" onChange={onSelectFile} className="mb-4" />

                                {upImg && (
                                  <div className="mb-4">
                                    <ReactCrop
                                      crop={crop}
                                      onChange={(c) => setCrop(c)}
                                      onComplete={onCropComplete}
                                      aspect={4 / 3} // Enforce 4:3 aspect ratio
                                      minWidth={100}
                                      minHeight={75}
                                      ruleOfThirds
                                    >
                                      <img ref={imgRef} alt="Upload" src={upImg} onLoad={onImageLoad} style={{ maxWidth: '100%' }} />
                                    </ReactCrop>
                                    <button
                                      type="button"
                                      onClick={handleImageCropAndSelect}
                                      disabled={!completedCrop?.width || !completedCrop?.height}
                                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                      Crop & Select Image
                                    </button>
                                  </div>
                                )}

                                {editForm.image && !upImg && (
                                  <div className="mt-4">
                                    <h3 className="text-md font-medium text-gray-700 mb-2">Current Image:</h3>
                                    <img src={editForm.image} alt="Current Product" className="max-w-xs h-auto border rounded-md" />
                                    <button
                                      type="button"
                                      onClick={() => setEditForm(prev => ({ ...prev, image: '' }))} // Clear selected image
                                      className="ml-4 text-red-500 hover:text-red-700"
                                    >
                                      Remove Image
                                    </button>
                                  </div>
                                )}
                                <canvas ref={previewCanvasRef} style={{ display: 'none' }} /> {/* Hidden canvas for cropping */}
                              </div>

                              {/* Specifications */}
                              <div className="border-t pt-4 mt-4">
                                <h4 className="text-lg font-semibold mb-2">Specifications</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Material</label>
                                    <input
                                      type="text"
                                      name="material"
                                      value={editForm.specifications.material}
                                      onChange={handleSpecificationChange}
                                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Finish</label>
                                    <input
                                      type="text"
                                      name="finish"
                                      value={editForm.specifications.finish}
                                      onChange={handleSpecificationChange}
                                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Type</label>
                                    <input
                                      type="text"
                                      name="type"
                                      value={editForm.specifications.type}
                                      onChange={handleSpecificationChange}
                                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Variants */}
                              <div className="border-t pt-4 mt-4">
                                <h4 className="text-lg font-semibold mb-2">Variants</h4>
                                {editForm.variants.map((variant, index) => (
                                  <div key={index} className="grid grid-cols-4 gap-4 mb-3 items-end">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Size</label>
                                      <input
                                        type="text"
                                        value={variant.size}
                                        onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Price</label>
                                      <input
                                        type="number"
                                        value={variant.price}
                                        onChange={(e) => handleVariantChange(index, 'price', Number(e.target.value))}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Stock</label>
                                      <input
                                        type="number"
                                        value={variant.stock}
                                        onChange={(e) => handleVariantChange(index, 'stock', Number(e.target.value))}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                      />
                                    </div>
                                    <div className="flex justify-end">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveVariant(index)}
                                        className="text-red-600 hover:text-red-800"
                                      >
                                        <MinusCircle size={20} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={handleAddVariant}
                                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-2"
                                >
                                  <PlusCircle size={16} className="mr-1" /> Add Variant
                                </button>
                              </div>

                              {/* Features */}
                              <div className="border-t pt-4 mt-4">
                                <h4 className="text-lg font-semibold mb-2">Features</h4>
                                {editForm.features.map((feature, index) => (
                                  <div key={index} className="flex items-center space-x-2 mb-2">
                                    <input
                                      type="text"
                                      value={feature}
                                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                                      className="flex-grow border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveFeature(index)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <MinusCircle size={20} />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={handleAddFeature}
                                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-2"
                                >
                                  <PlusCircle size={16} className="mr-1" /> Add Feature
                                </button>
                              </div>

                              <div className="mt-6 flex justify-end space-x-4">
                                <button
                                  type="button"
                                  onClick={() => setEditingProduct(null)} // Cancel edit
                                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={handleSave}
                                  disabled={loading}
                                  className={`flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md shadow-sm text-sm font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <Save className="h-5 w-5 mr-1" />
                                  {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
