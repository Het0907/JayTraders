import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  ChevronRight,
  ArrowRight,
  FileCheck,
  CheckCircle2,
  PackageOpen,
  X,
  ExternalLink,
  ShieldCheck,
  Building2,
  PhoneCall
} from 'lucide-react';
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
    <div className="jt-catprod min-h-screen bg-[#EEF0EC] flex items-center justify-center">
      <div className="text-center space-y-4 p-8 bg-white border border-[#14171A]/15 shadow-md">
        <div className="inline-block w-10 h-10 border-4 border-[#C8102E] border-t-transparent rounded-full animate-spin" />
        <p className="jt-mono text-xs uppercase tracking-widest text-[#14171A] font-bold">Querying Inventory Specifications...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="jt-catprod min-h-screen bg-[#EEF0EC] flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md p-8 bg-white border border-[#14171A]/15 shadow-lg">
        <PackageOpen className="w-12 h-12 text-[#C8102E] mx-auto" />
        <h2 className="jt-display text-2xl font-bold uppercase text-[#14171A]">Data Unavailable</h2>
        <p className="text-sm text-[#4B5563]">{error}</p>
        <Link to={'/category/' + categorySlug} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#14171A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C8102E] transition-colors">
          &larr; Return to {categoryName || 'Category'}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="jt-catprod min-h-screen bg-[#EEF0EC]">

      {/* ============ BREADCRUMB HEADER ============ */}
      <div className="border-b border-[#14171A]/10 bg-white/70">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex items-center gap-2 text-xs flex-wrap">
          <Link to="/home" className="jt-mono text-[#4B5563] hover:text-[#C8102E] transition-colors">HOME</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={'/category/' + categorySlug} className="jt-mono text-[#4B5563] hover:text-[#C8102E] transition-colors uppercase">
            {categoryName || 'CATEGORY'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="jt-mono font-bold text-[#C8102E] uppercase">{subcategoryName}</span>
        </div>
      </div>

      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden py-10 sm:py-14 border-b border-[#14171A]/10">
        {/* Blueprint grid backdrop */}
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
            <FileCheck className="w-3.5 h-3.5" />
            Verified Industrial Line
          </span>
          <h1 className="jt-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#14171A] leading-[0.95] mb-3">
            {subcategoryName}
          </h1>
          <p className="jt-mono text-xs text-[#4B5563] uppercase tracking-wider">
            Displaying {products.length} registered brand specifications · Click any card for inspection sheet
          </p>
        </div>
      </section>

      {/* ============ PRODUCT CARDS GRID ============ */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">

          {products.length === 0 ? (
            <div className="text-center py-16 bg-white border border-[#14171A]/15 p-8">
              <PackageOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="jt-display text-2xl font-bold uppercase text-[#14171A]">No Brands Currently Logged</h3>
              <p className="text-sm text-[#4B5563] mt-1">Direct inquiries for this item are still accepted via our sales desk.</p>
              <Link to="/contact" className="mt-4 inline-flex items-center gap-2 bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 hover:bg-[#a80d26] transition-colors">
                Inquire With Sales Desk
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, idx) => (
                <div
                  key={product._id || idx}
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-white border border-[#14171A]/15 shadow-sm hover:shadow-xl hover:border-[#C8102E]/60 transition-all duration-200 flex flex-col cursor-pointer relative overflow-hidden"
                >
                  {/* Card top banner */}
                  <div className="px-4 py-2 bg-[#14171A] text-white flex items-center justify-between border-b border-white/10">
                    <span className="jt-mono text-[10px] text-[#E8A324] font-bold uppercase tracking-wider">
                      SPEC #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="jt-mono text-[10px] text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
                      EXPAND <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Image Frame */}
                  <div className="w-full h-44 bg-[#EEF0EC]/60 border-b border-[#14171A]/10 flex items-center justify-center p-4 relative overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.brand || product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                      />
                    ) : (
                      <div className="text-center">
                        <span className="text-4xl opacity-25">📦</span>
                        <span className="jt-mono text-[10px] text-slate-400 uppercase block mt-1">Photo on File</span>
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      <h3 className="jt-display text-2xl font-bold uppercase text-[#14171A] group-hover:text-[#C8102E] transition-colors leading-tight mb-2">
                        {product.brand || product.name}
                      </h3>

                      {product.features && product.features.length > 0 ? (
                        <div className="space-y-1.5 mb-4">
                          {product.features.slice(0, 3).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start text-xs text-[#4B5563] gap-1.5">
                              <span className="text-[#C8102E] font-black leading-none mt-0.5">•</span>
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                          {product.features.length > 3 && (
                            <span className="jt-mono text-[10px] font-bold text-[#C8102E] block pt-0.5">
                              +{product.features.length - 3} ADDITIONAL SPECS &rarr;
                            </span>
                          )}
                        </div>
                      ) : product.description ? (
                        <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-3 mb-4">
                          {product.description}
                        </p>
                      ) : (
                        <div className="h-4" />
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 border-t border-[#14171A]/10">
                      <Link
                        to={'/contact?product=' + encodeURIComponent((product.brand ? product.brand + ' - ' : '') + (product.name || ''))}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-2.5 px-4 bg-[#14171A] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                      >
                        Request Quotation <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 pt-6 border-t border-[#14171A]/10 flex justify-between items-center text-xs">
            <Link to={'/category/' + categorySlug} className="jt-mono text-[#14171A] hover:text-[#C8102E] font-bold transition-colors flex items-center gap-1.5">
              &larr; BACK TO {categoryName || 'CATEGORY'}
            </Link>
            <Link to="/contact" className="jt-mono text-[#C8102E] font-bold hover:underline">
              REQUEST CUSTOM MILL QUANTITIES &rarr;
            </Link>
          </div>

        </div>
      </section>

      {/* ============ DETAILED POPUP SPECIFICATION MODAL ============ */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-[#14171A]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white border-2 border-[#14171A] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-[0_25px_60px_-15px_rgba(20,23,26,0.5)] flex flex-col md:flex-row relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-[#14171A] text-white hover:bg-[#C8102E] flex items-center justify-center font-bold transition-colors"
              title="Close specification sheet"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Photo & Certificate Frame */}
            <div className="md:w-1/2 bg-[#EEF0EC] p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#14171A]/15 min-h-[260px] md:min-h-[440px] relative">
              <span className="jt-mono absolute top-3 left-3 text-[10px] uppercase tracking-wider text-[#4B5563] bg-white border border-[#14171A]/10 px-2 py-0.5">
                SAMPLE RECORD
              </span>

              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.brand}
                  className="max-h-[320px] w-full object-contain drop-shadow-md"
                />
              ) : (
                <div className="text-center py-10">
                  <span className="text-6xl opacity-25 block">📦</span>
                  <span className="jt-mono text-xs text-slate-500 uppercase mt-2 block">Drawing Specification on Request</span>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <span className="jt-mono inline-flex items-center gap-1 text-[10px] text-[#1F3A5F] bg-white/70 border border-[#1F3A5F]/20 px-2.5 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E8A324]" />
                  BATCH TESTED
                </span>
                <span className="jt-mono inline-flex items-center gap-1 text-[10px] text-[#1F3A5F] bg-white/70 border border-[#1F3A5F]/20 px-2.5 py-1">
                  <Building2 className="w-3.5 h-3.5 text-[#1F3A5F]" />
                  MAKARPURA STOCK
                </span>
              </div>
            </div>

            {/* Right Detailed Specs Ledger */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[85vh] space-y-6">

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="jt-mono text-xs font-bold uppercase tracking-wider text-[#C8102E] bg-[#C8102E]/10 px-2.5 py-1">
                    {selectedProduct.name}
                  </span>
                  {categoryName && (
                    <span className="jt-mono text-xs text-[#14171A] bg-[#EEF0EC] px-2.5 py-1">
                      {categoryName}
                    </span>
                  )}
                </div>

                <h2 className="jt-display text-3xl sm:text-4xl font-extrabold uppercase text-[#14171A] tracking-tight leading-tight">
                  {selectedProduct.brand}
                </h2>

                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="jt-mono block text-[11px] font-bold text-[#14171A] uppercase tracking-wider border-b border-[#14171A]/10 pb-1">
                      Technical Attributes & Standards
                    </span>
                    <div className="bg-[#EEF0EC]/60 border border-[#14171A]/10 p-4 space-y-2">
                      {selectedProduct.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start text-xs sm:text-sm text-slate-800 gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProduct.description && (
                  <div className="space-y-1.5 pt-1">
                    <span className="jt-mono block text-[11px] font-bold text-[#14171A] uppercase tracking-wider border-b border-[#14171A]/10 pb-1">
                      Application Notes
                    </span>
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed whitespace-pre-line bg-[#EEF0EC]/40 p-3.5 border border-[#14171A]/10">
                      {selectedProduct.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#14171A]/10 flex flex-col sm:flex-row gap-3">
                <Link
                  to={'/contact?product=' + encodeURIComponent((selectedProduct.brand ? selectedProduct.brand + ' - ' : '') + (selectedProduct.name || ''))}
                  className="flex-1 text-center py-3.5 px-6 bg-[#C8102E] hover:bg-[#a80d26] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" /> Request Official Quotation
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="py-3.5 px-5 bg-[#EEF0EC] hover:bg-[#14171A] hover:text-white text-[#14171A] text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      <style>{`
        .jt-catprod { font-family: 'IBM Plex Sans', sans-serif; }
        .jt-display { font-family: 'Big Shoulders Display', sans-serif; }
        .jt-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>
    </div>
  );
}
