import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS, { API_TIMEOUT } from './config/api';

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const catRes = await axios.get(API_ENDPOINTS.BASE_URL + '/api/categories', { timeout: API_TIMEOUT });
        const allCategories = catRes.data || [];
        const normSlug = (categorySlug || '').toLowerCase().trim();
        const main = allCategories.find(c => 
          (c.slug || '').toLowerCase() === normSlug ||
          (c.name || '').toLowerCase().replace(/\s+/g, '-') === normSlug ||
          c._id === categorySlug
        );
        if (!main) { setError('Category not found.'); setLoading(false); return; }
        setCategoryInfo(main);

        const prodRes = await axios.get(API_ENDPOINTS.PRODUCTS, { 
          params: { category: main.slug || categorySlug },
          timeout: API_TIMEOUT
        });
        const products = prodRes.data || [];

        const grouped = {};
        products.forEach(p => {
          const key = p.name || 'Uncategorized';
          if (!grouped[key]) grouped[key] = { name: key };
        });
        setSubcategories(Object.values(grouped));
      } catch (err) {
        console.error('Error loading category data:', err);
        setError('Failed to load data. Please ensure backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categorySlug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-block w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 font-medium">Loading categories...</p>
      </div>
    </div>
  );

  if (error || !categoryInfo) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-4xl">⚠️</p>
        <p className="text-gray-700 font-semibold">{error || 'Category not found.'}</p>
        <Link to="/home" className="text-red-600 font-bold hover:underline">Back to Home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.35em] text-red-500 font-bold mb-3">Browse Catalog</p>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">{categoryInfo.name}</h1>
          {categoryInfo.description && <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">{categoryInfo.description}</p>}
          <div className="mt-6 h-1 w-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto" />
        </div>

        {subcategories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-xl font-semibold text-gray-500">No products added yet.</p>
            <p className="text-sm text-gray-400 mt-2">Use the Product Utility to add products under this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {subcategories.map((sub, idx) => (
              <Link
                key={sub.name}
                to={'/category/' + categorySlug + '/' + encodeURIComponent(sub.name)}
                className="group relative flex items-center justify-center text-center bg-white border border-gray-200 rounded-2xl px-5 py-8 min-h-[120px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                <span className="absolute top-3 right-3 text-[11px] font-bold text-gray-300 group-hover:text-red-400 transition-colors">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors leading-snug">
                  {sub.name}
                </h3>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <Link to="/home" className="text-sm text-gray-400 hover:text-red-500 font-semibold transition-colors">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
