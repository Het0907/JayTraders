import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, ArrowRight, Layers, PackageOpen, ArrowLeft } from 'lucide-react';
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
    <div className="jt-cat min-h-screen bg-[#EEF0EC] flex items-center justify-center">
      <div className="text-center space-y-4 p-8 bg-white border border-[#14171A]/15 shadow-md">
        <div className="inline-block w-10 h-10 border-4 border-[#C8102E] border-t-transparent rounded-full animate-spin" />
        <p className="jt-mono text-xs uppercase tracking-widest text-[#14171A] font-bold">Accessing Material Database...</p>
      </div>
    </div>
  );

  if (error || !categoryInfo) return (
    <div className="jt-cat min-h-screen bg-[#EEF0EC] flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md p-8 bg-white border border-[#14171A]/15 shadow-lg">
        <PackageOpen className="w-12 h-12 text-[#C8102E] mx-auto" />
        <h2 className="jt-display text-2xl font-bold uppercase text-[#14171A]">Category Not Located</h2>
        <p className="text-sm text-[#4B5563]">{error || 'Requested material category is unavailable in catalog.'}</p>
        <Link to="/home" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#14171A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C8102E] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    </div>
  );

  return (
    <div className="jt-cat min-h-screen bg-[#EEF0EC]">
      
      {/* ============ BREADCRUMB HEADER ============ */}
      <div className="border-b border-[#14171A]/10 bg-white/70">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex items-center gap-2 text-xs">
          <Link to="/home" className="jt-mono text-[#4B5563] hover:text-[#C8102E] transition-colors">HOME</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="jt-mono text-[#4B5563]">CATALOG</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="jt-mono font-bold text-[#C8102E] uppercase">{categoryInfo.name}</span>
        </div>
      </div>

      {/* ============ CATEGORY HERO SECTION ============ */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-b border-[#14171A]/10">
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
          <div className="max-w-4xl">
            <span className="jt-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8102E] mb-3">
              <Layers className="w-3.5 h-3.5" />
              Stock Line Classification
            </span>
            <h1 className="jt-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#14171A] leading-[0.95] mb-4">
              {categoryInfo.name}
            </h1>
            {categoryInfo.description && (
              <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-2xl">
                {categoryInfo.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ============ SUBCATEGORIES LIST ============ */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#14171A]/10">
            <span className="jt-mono text-xs uppercase tracking-wider text-[#4B5563]">
              Available Product Types ({subcategories.length})
            </span>
            <span className="jt-mono text-[11px] text-[#C8102E] font-bold">
              SELECT ITEM FOR SPECIFICATIONS
            </span>
          </div>

          {subcategories.length === 0 ? (
            <div className="text-center py-16 bg-white border border-[#14171A]/15 p-8">
              <PackageOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="jt-display text-2xl font-bold uppercase text-[#14171A]">No Subcategories In Stock</h3>
              <p className="text-sm text-[#4B5563] mt-1">Please check back shortly or request a custom quotation directly from our sales team.</p>
              <Link to="/contact" className="mt-4 inline-flex items-center gap-2 bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 hover:bg-[#a80d26] transition-colors">
                Request Custom Quote
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {subcategories.map((sub, idx) => (
                <Link
                  key={sub.name}
                  to={'/category/' + categorySlug + '/' + encodeURIComponent(sub.name)}
                  className="jt-plate group relative bg-[#14171A] p-6 sm:p-7 flex flex-col justify-between min-h-[140px]"
                >
                  <span className="jt-rivet" style={{ top: 8, left: 8 }} />
                  <span className="jt-rivet" style={{ top: 8, right: 8 }} />
                  <span className="jt-rivet" style={{ bottom: 8, left: 8 }} />
                  <span className="jt-rivet" style={{ bottom: 8, right: 8 }} />

                  <div className="flex items-start justify-between mb-4">
                    <span className="jt-mono text-xs font-bold text-[#E8A324] bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm">
                      SPEC #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C8102E] group-hover:translate-x-1 transition-all duration-200" />
                  </div>

                  <div>
                    <h3 className="jt-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-[#E8A324] transition-colors leading-snug mb-3">
                      {sub.name}
                    </h3>
                    <span className="block h-0.5 w-8 bg-[#C8102E] group-hover:w-full transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12 pt-6 border-t border-[#14171A]/10 flex justify-between items-center text-xs">
            <Link to="/home" className="jt-mono text-[#14171A] hover:text-[#C8102E] font-bold transition-colors flex items-center gap-1.5">
              &larr; BACK TO HOMEPAGE
            </Link>
            <Link to="/contact" className="jt-mono text-[#C8102E] font-bold hover:underline">
              NEED CUSTOM SIZES? INQUIRE HERE &rarr;
            </Link>
          </div>

        </div>
      </section>

      <style>{`
        .jt-cat { font-family: 'IBM Plex Sans', sans-serif; }
        .jt-display { font-family: 'Big Shoulders Display', sans-serif; }
        .jt-mono { font-family: 'IBM Plex Mono', monospace; }

        .jt-rivet {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background: radial-gradient(circle at 35% 30%, #6b7280, #23262b 70%);
          box-shadow: 0 1px 1px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}
