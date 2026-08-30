import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ShoppingBag,
  ArrowLeft,
  Building2,
  PackageOpen
} from 'lucide-react';
import { useCart } from './context/CartContext';
import { toast } from 'react-toastify';
import API_ENDPOINTS from './config/api';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.PRODUCTS}/${slug}`);
        setProduct(response.data);
        if (response.data.variants && response.data.variants.length > 0) {
          setSelectedVariant(response.data.variants[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || 'Failed to fetch product specifications');
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

  const handleAddToCart = async () => {
    if (selectedVariant && quantity > 0) {
      try {
        const success = await addToCart(product._id, selectedVariant._id, quantity);
        if (success) {
          toast.success('Product added to requisition cart!');
          setQuantity(1);
        } else {
          toast.error('Failed to add product. Please try again.');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add product. Please try again.');
      }
    } else {
      toast.error('Please select a size and valid quantity');
    }
  };

  if (loading) {
    return (
      <div className="jt-detail min-h-screen bg-[#EEF0EC] flex items-center justify-center">
        <div className="text-center space-y-4 p-8 bg-white border border-[#14171A]/15 shadow-md">
          <div className="inline-block w-10 h-10 border-4 border-[#C8102E] border-t-transparent rounded-full animate-spin" />
          <p className="jt-mono text-xs uppercase tracking-widest text-[#14171A] font-bold">Loading Material Specifications...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="jt-detail min-h-screen bg-[#EEF0EC] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md p-8 bg-white border border-[#14171A]/15 shadow-lg">
          <PackageOpen className="w-12 h-12 text-[#C8102E] mx-auto" />
          <h2 className="jt-display text-2xl font-bold uppercase text-[#14171A]">Item Not Located</h2>
          <p className="text-sm text-[#4B5563]">{error || 'Product specification record is unavailable.'}</p>
          <Link to="/home" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#14171A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C8102E] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="jt-detail min-h-screen bg-[#EEF0EC]">
      
      {/* Breadcrumb Header */}
      <div className="border-b border-[#14171A]/10 bg-white/70">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex items-center gap-2 text-xs">
          <Link to="/home" className="jt-mono text-[#4B5563] hover:text-[#C8102E] transition-colors">HOME</Link>
          <span className="text-slate-400">/</span>
          <span className="jt-mono text-[#4B5563]">PRODUCT</span>
          <span className="text-slate-400">/</span>
          <span className="jt-mono font-bold text-[#C8102E] uppercase">{product.name}</span>
        </div>
      </div>

      {/* Main Spec Ledger */}
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Photo Frame */}
          <div className="lg:col-span-5 bg-white border border-[#14171A]/15 p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center relative">
            <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-[#14171A]/10">
              <span className="jt-mono text-xs font-bold text-[#C8102E] uppercase tracking-wider">
                {product.inStock ? '● IN STOCK VADODARA' : '○ ON ORDER / LEAD TIME'}
              </span>
              <span className="jt-mono text-[10px] text-slate-400 uppercase">
                INSPECTION RECORD
              </span>
            </div>

            <div className="w-full h-80 sm:h-96 flex items-center justify-center bg-[#EEF0EC]/50 p-4">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                />
              ) : (
                <div className="text-center py-12">
                  <span className="text-7xl opacity-20">📦</span>
                  <span className="jt-mono text-xs text-slate-400 block mt-2">Technical Drawing on File</span>
                </div>
              )}
            </div>

            <div className="w-full mt-4 pt-4 border-t border-[#14171A]/10 flex items-center justify-between text-xs">
              <span className="jt-mono text-slate-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E8A324]" /> IBR & ISO Certified
              </span>
              <span className="jt-mono text-slate-600 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#1F3A5F]" /> Makarpura Facility
              </span>
            </div>
          </div>

          {/* Right Product Specifications */}
          <div className="lg:col-span-7 bg-white border border-[#14171A]/15 p-6 sm:p-10 shadow-sm space-y-6">
            
            <div>
              {product.brand && (
                <span className="jt-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E] block mb-1">
                  {product.brand}
                </span>
              )}
              <h1 className="jt-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-[#14171A] tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>

            {product.description && (
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed bg-[#EEF0EC]/50 p-4 border border-[#14171A]/10">
                {product.description}
              </p>
            )}

            {/* Price & Variant Selection */}
            <div className="p-5 bg-[#14171A] text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="jt-mono text-xs text-[#E8A324] uppercase tracking-wider">Rate Specification</span>
                <span className="jt-display text-3xl font-black text-[#E8A324]">
                  ₹{selectedVariant?.price?.toLocaleString() || 'Price on Request'}
                </span>
              </div>

              {product.variants && product.variants.length > 1 && (
                <div className="space-y-2">
                  <span className="jt-mono block text-[11px] text-slate-300 uppercase tracking-wider">
                    Available Sizing / Schedule:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.size}
                        onClick={() => handleVariantChange(variant)}
                        className={`px-3.5 py-1.5 text-xs font-bold uppercase transition-all ${
                          selectedVariant?.size === variant.size
                            ? 'bg-[#C8102E] text-white border border-[#C8102E]'
                            : 'bg-white/10 text-slate-300 border border-white/20 hover:bg-white/20'
                        }`}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <div className="flex items-center bg-white/10 border border-white/20 px-3 py-2 w-fit">
                  <label htmlFor="quantity" className="jt-mono text-xs text-slate-300 uppercase mr-3">Qty</label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 bg-white text-[#14171A] text-center font-bold text-sm py-1 outline-none"
                  />
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 bg-[#C8102E] hover:bg-[#a80d26] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Order Cart
                </button>
              </div>
            </div>

            {/* Technical Attributes Checklist */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="jt-mono block text-xs font-bold text-[#14171A] uppercase tracking-wider border-b border-[#14171A]/10 pb-1">
                  Technical Specifications
                </span>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-[#4B5563]">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 p-2 bg-[#EEF0EC]/40 border border-[#14171A]/10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C8102E] shrink-0" />
                      <span><strong>{key}:</strong> {value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features list */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="jt-mono block text-xs font-bold text-[#14171A] uppercase tracking-wider border-b border-[#14171A]/10 pb-1">
                  Standard Compliance
                </span>
                <ul className="space-y-1.5 text-xs text-[#4B5563]">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C8102E] font-bold mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Direct Quote link */}
            <div className="pt-4 border-t border-[#14171A]/10 flex justify-between items-center text-xs">
              <Link
                to={'/contact?product=' + encodeURIComponent((product.brand ? product.brand + ' - ' : '') + product.name)}
                className="jt-mono text-[#C8102E] font-bold hover:underline flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" /> REQUEST SITE QUOTATION & DISPATCH SCHEDULE &rarr;
              </Link>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .jt-detail { font-family: 'IBM Plex Sans', sans-serif; }
        .jt-display { font-family: 'Big Shoulders Display', sans-serif; }
        .jt-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>
    </div>
  );
};

export default ProductDetail;