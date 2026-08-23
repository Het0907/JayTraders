import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS, { API_TIMEOUT } from './config/api';

export default function CategoryProducts() {
  const { categorySlug, subcategorySlug } = useParams();
  const subcategoryName = decodeURIComponent(subcategorySlug || '');

  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        if (main) setCategoryName(main.name);

        const prodRes = await axios.get(API_ENDPOINTS.PRODUCTS, { 
          params: { category: main?.slug || categorySlug },
          timeout: API_TIMEOUT
        });
        const allProducts = prodRes.data || [];

        const filtered = allProducts.filter(p =>
          (p.name || '').toLowerCase().trim() === subcategoryName.toLowerCase().trim()
        );
        setProducts(filtered);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please ensure backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categorySlug, subcategoryName]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-block w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 font-medium">Loading products...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-4xl">⚠️</p>
        <p className="text-gray-700 font-semibold">{error}</p>
        <Link to={'/category/' + categorySlug} className="text-red-600 font-bold hover:underline">Go back</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-red-500 font-bold mb-3">{categoryName}</p>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">{subcategoryName}</h1>
          <p className="text-xs text-gray-400 mt-2 font-medium">Click on any brand card to view detailed specifications</p>
          <div className="mt-6 h-1 w-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto" />
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-xl font-semibold text-gray-500">No brands found in this sub-category.</p>
            <p className="text-sm text-gray-400 mt-2">Add brands via the Product Utility.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <div
                key={product._id || idx}
                onClick={() => setSelectedProduct(product)}
                className="group bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer relative"
                style={{ height: '380px' }}
              >
                {/* Fixed Image Zone */}
                <div className="flex-none w-full h-40 bg-gray-50 border-b border-gray-100 overflow-hidden relative">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.brand || product.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl opacity-20">📦</span>
                    </div>
                  )}

                  {/* Click to Expand Badge */}
                  <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Click for details ↗
                  </span>
                </div>

                {/* Card Content Zone */}
                <div className="flex flex-col flex-1 p-5 min-h-0">
                  <h2 className="flex-none text-xl font-black text-gray-900 leading-tight line-clamp-1 mb-1">
                    {product.brand}
                  </h2>

                  {/* Bullet Points Preview if available */}
                  {product.features && product.features.length > 0 ? (
                    <div className="flex-1 mt-2 overflow-y-auto pr-1 space-y-1">
                      {product.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start text-xs text-gray-600 gap-1.5">
                          <span className="text-red-500 font-bold leading-none mt-0.5">•</span>
                          <span className="line-clamp-1 leading-snug">{feat}</span>
                        </div>
                      ))}
                      {product.features.length > 3 && (
                        <span className="text-[11px] font-bold text-red-500 block pt-0.5">
                          +{product.features.length - 3} more specs ↗
                        </span>
                      )}
                    </div>
                  ) : product.description ? (
                    <p className="flex-1 mt-2 text-xs text-gray-500 leading-relaxed overflow-y-auto pr-1">
                      {product.description}
                    </p>
                  ) : (
                    <div className="flex-1" />
                  )}

                  {/* Action CTA */}
                  <div className="flex-none pt-4 border-t border-gray-100 mt-2">
                    <Link
                      to={'/contact?product=' + encodeURIComponent((product.brand ? product.brand + ' - ' : '') + (product.name || ''))}
                      onClick={(e) => e.stopPropagation()}
                      className="block w-full text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold hover:from-red-700 hover:to-pink-700 transition-all duration-200 hover:shadow-md"
                    >
                      Request Quotation
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            to={'/category/' + categorySlug}
            className="text-sm text-gray-400 hover:text-red-500 font-semibold transition-colors"
          >
            Back to {categoryName}
          </Link>
        </div>
      </div>

      {/* ════ DETAILED PRODUCT POPUP MODAL ════ */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row relative border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 rounded-full flex items-center justify-center font-bold transition-all shadow-sm"
              title="Close"
            >
              ✕
            </button>

            {/* LEFT COLUMN: BIGGER IMAGE */}
            <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6 sm:p-8 border-b md:border-b-0 md:border-r border-gray-100 min-h-[260px] md:min-h-[460px]">
              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.brand}
                  className="max-h-[380px] w-full object-contain rounded-2xl drop-shadow-md"
                />
              ) : (
                <div className="text-center py-12">
                  <span className="text-7xl opacity-20 block">📦</span>
                  <span className="text-xs text-gray-400 font-medium mt-2 block">No photo available</span>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: STRUCTURED PRODUCT DETAILS */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[85vh] space-y-6">
              <div className="space-y-4">
                
                {/* Subcategory & Category Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-extrabold uppercase tracking-wider rounded-full">
                    {selectedProduct.name}
                  </span>
                  {categoryName && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                      {categoryName}
                    </span>
                  )}
                </div>

                {/* Brand Name */}
                <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                  {selectedProduct.brand}
                </h2>

                {/* Structured Bullet Points / Key Features */}
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Specifications & Details
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2.5">
                      {selectedProduct.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-800 gap-2.5">
                          <span className="text-red-500 font-black mt-0.5 text-base leading-none">✓</span>
                          <span className="font-medium leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Description Text */}
                {selectedProduct.description && (
                  <div className="space-y-1.5 pt-1">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Description
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                      {selectedProduct.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <Link
                  to={'/contact?product=' + encodeURIComponent((selectedProduct.brand ? selectedProduct.brand + ' - ' : '') + (selectedProduct.name || ''))}
                  className="flex-1 text-center py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-bold hover:from-red-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Request Official Quotation
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="py-3.5 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
