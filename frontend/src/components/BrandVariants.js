import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import API_ENDPOINTS from '../config/api';

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
        const response = await axios.get(API_ENDPOINTS.PRODUCTS, {
          params: {
            category: subcategorySlug,
            brand: brandSlug,
          },
        });
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load specifications. Please try again later.');
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
        toast.success('Product added to requisition cart!');
      } else {
        toast.error('Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="jt-variants min-h-screen bg-[#EEF0EC] flex items-center justify-center">
        <div className="text-center space-y-4 p-8 bg-white border border-[#14171A]/15 shadow-md">
          <div className="inline-block w-10 h-10 border-4 border-[#C8102E] border-t-transparent rounded-full animate-spin" />
          <p className="jt-mono text-xs uppercase tracking-widest text-[#14171A] font-bold">Retrieving Sizing & Variant Specs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jt-variants min-h-screen bg-[#EEF0EC] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md p-8 bg-white border border-[#14171A]/15 shadow-lg">
          <p className="text-red-600 text-sm font-semibold">{error}</p>
          <Link
            to={`/category/${categorySlug}/${subcategorySlug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#14171A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C8102E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Subcategory
          </Link>
        </div>
      </div>
    );
  }

  const brandDisplayName = (brandSlug || '').replace(/-/g, ' ');

  return (
    <div className="jt-variants min-h-screen bg-[#EEF0EC]">
      
      {/* Breadcrumbs */}
      <div className="border-b border-[#14171A]/10 bg-white/70">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex items-center gap-2 text-xs flex-wrap">
          <Link to="/home" className="jt-mono text-[#4B5563] hover:text-[#C8102E] transition-colors">HOME</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/category/${categorySlug}`} className="jt-mono text-[#4B5563] hover:text-[#C8102E] transition-colors uppercase">
            {categorySlug}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/category/${categorySlug}/${subcategorySlug}`} className="jt-mono text-[#4B5563] hover:text-[#C8102E] transition-colors uppercase">
            {subcategorySlug}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="jt-mono font-bold text-[#C8102E] uppercase">{brandDisplayName}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-10 sm:py-14 border-b border-[#14171A]/10">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(31,58,95,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(31,58,95,0.20) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <span className="jt-mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-[#C8102E] mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E8A324]" />
            Brand Technical Specifications
          </span>
          <h1 className="jt-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#14171A] leading-[0.95]">
            {brandDisplayName}
          </h1>
          <p className="jt-mono text-xs text-[#4B5563] uppercase tracking-wider mt-2">
            Select sizing options, verify tolerances, and add quantities for direct quotation
          </p>
        </div>
      </section>

      {/* Main Variants Container */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="space-y-10">
            {products.map((product, pIdx) => (
              <div
                key={product._id || pIdx}
                className="bg-white border border-[#14171A]/15 shadow-sm p-6 sm:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-[#14171A]/10 gap-3">
                  <div>
                    <span className="jt-mono text-xs font-bold text-[#C8102E] uppercase tracking-wider">
                      ITEM #{String(pIdx + 1).padStart(2, '0')}
                    </span>
                    <h2 className="jt-display text-2xl sm:text-3xl font-extrabold uppercase text-[#14171A] tracking-tight">
                      {product.name}
                    </h2>
                  </div>
                  <Link
                    to={'/contact?product=' + encodeURIComponent((product.brand ? product.brand + ' - ' : '') + product.name)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#14171A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C8102E] transition-colors shrink-0 self-start"
                  >
                    Request Bulk BOQ
                  </Link>
                </div>

                {product.description && (
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6 bg-[#EEF0EC]/50 p-4 border border-[#14171A]/10">
                    {product.description}
                  </p>
                )}

                {/* Sizing Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {product.variants && product.variants.map((variant) => {
                    const key = `${product._id}-${variant._id}`;
                    const quantity = quantities[key] || 1;

                    return (
                      <div
                        key={variant._id || variant.size}
                        className="border border-[#14171A]/15 p-5 bg-[#EEF0EC]/40 hover:bg-white transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="jt-mono text-[10px] text-slate-500 uppercase tracking-wider">Size Spec</span>
                            <span className="jt-mono text-xs font-bold text-[#14171A] bg-white border border-[#14171A]/10 px-2 py-0.5">
                              {variant.size}
                            </span>
                          </div>

                          <div className="my-3">
                            <span className="jt-mono text-[10px] text-slate-500 uppercase block">Indicative Rate</span>
                            <span className="jt-display text-2xl font-black text-[#C8102E]">
                              ₹{variant.price?.toLocaleString() || 'On Request'}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-[#14171A]/10">
                          <div className="flex items-center justify-between">
                            <span className="jt-mono text-[11px] text-slate-600 uppercase">Qty</span>
                            <div className="flex items-center border border-[#14171A]/20 bg-white">
                              <button
                                onClick={() => handleQuantityChange(product._id, variant._id, quantity - 1)}
                                className="px-2.5 py-1 text-xs hover:bg-[#EEF0EC] transition-colors"
                              >
                                -
                              </button>
                              <span className="jt-mono px-3 text-xs font-bold">{quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(product._id, variant._id, quantity + 1)}
                                className="px-2.5 py-1 text-xs hover:bg-[#EEF0EC] transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => handleAddToCart(product._id, variant._id)}
                            className="w-full py-2 bg-[#14171A] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Add to Order
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-[#14171A]/10 flex justify-between items-center text-xs">
            <Link
              to={`/category/${categorySlug}/${subcategorySlug}`}
              className="jt-mono text-[#14171A] hover:text-[#C8102E] font-bold transition-colors flex items-center gap-1.5"
            >
              &larr; BACK TO {subcategorySlug?.toUpperCase()}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .jt-variants { font-family: 'IBM Plex Sans', sans-serif; }
        .jt-display { font-family: 'Big Shoulders Display', sans-serif; }
        .jt-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>
    </div>
  );
}