import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, Menu, ShoppingBag, X, Phone, Mail, MapPin, ArrowRight, Shield, Truck, Award, Users, Search, Home, ChevronRight, Package } from "lucide-react";
import axios from 'axios';
import API_ENDPOINTS from './config/api';

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState(null);

  // Debug log when component mounts or categorySlug changes
  useEffect(() => {
    console.log('CategoryPage mounted/updated with slug:', categorySlug);
  }, [categorySlug]);

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Fetch category information and subcategories
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting to fetch category data for:', categorySlug);

        // Check if backend is accessible
        try {
          const healthCheck = await axios.get(`${API_ENDPOINTS.BASE_URL}/api/health`);
          console.log('Health check response:', healthCheck.data);
        } catch (err) {
          console.error('Health check failed:', err);
          throw new Error('Backend server is not accessible. Please make sure the server is running.');
        }

        // Fetch main category info
        console.log('Fetching category from:', `${API_ENDPOINTS.BASE_URL}/api/categories/slug/${categorySlug}`);
        const categoryResponse = await axios.get(`${API_ENDPOINTS.BASE_URL}/api/categories/slug/${categorySlug}`);
        console.log('Category response:', categoryResponse.data);
        
        if (!categoryResponse.data) {
          throw new Error('Category not found');
        }
        setCategoryInfo(categoryResponse.data);

        // Fetch subcategories
        console.log('Fetching subcategories for parent:', categoryResponse.data._id);
        const subcategoriesResponse = await axios.get(`${API_ENDPOINTS.BASE_URL}/api/categories`, {
          params: {
            parentCategory: categoryResponse.data._id
          }
        });
        console.log('Subcategories response:', subcategoriesResponse.data);
        
        setCategories(subcategoriesResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError(err.message || 'Failed to load category data');
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchCategoryData();
    }
  }, [categorySlug]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Helper to get correct image URL
  const getImageUrl = (img) => {
    if (!img) return '/default-product-image.png';
    if (img.startsWith('http')) return img;
    if (img.startsWith('/uploads/')) return `https://jaytraders-5.onrender.com${img}`;
    if (img.startsWith('uploads/')) return `https://jaytraders-5.onrender.com/${img}`;
    if (img.startsWith('/images/')) return `https://jaytraders-5.onrender.com${img}`;
    if (img.startsWith('images/')) return `https://jaytraders-5.onrender.com/${img}`;
    return `https://jaytraders-5.onrender.com/uploads/${img.replace(/^uploads[\\/]/, '')}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  if (!categoryInfo) {
    return (
      <div className="text-center text-red-600 py-8">
        Category not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryInfo.name}</h1>
            {categoryInfo.description && (
              <p className="text-lg text-gray-600">{categoryInfo.description}</p>
            )}
          </div>

          {/* Subcategories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/category/${categorySlug}/${category.slug}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  {category.image ? (
                    <img
                      src={getImageUrl(category.image)}
                      alt={category.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-4xl">
                      📦
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="mt-1 text-sm text-gray-500">
                      {category.description.replace(/Subcategory of .*$/, '').trim()}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 