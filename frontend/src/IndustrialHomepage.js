import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ArrowRight, Shield, Truck, Award, Users, 
  ChevronLeft, ChevronRight, CheckCircle2 
} from "lucide-react";

export default function IndustrialHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Featured slider items
  const featuredProducts = [
    {
      id: 1,
      name: "IBR Certified Valves & Fittings",
      // category: "High Demand",
      image: "/IBR.jpeg",
      bullets: [
        // "Full Inspection Documentation",
        // "Batch Testing & Metallurgy Proof"
      ],
      slug: "ibr-materials"
    },
    {
      id: 2,
      name: "Industrial Welding Rods",
      // category: "Engineering Grade",
      image: "/Welding-consumables.png",
      bullets: [
        // "High-tensile stress applications",
        // "ISO Certified Electrodes"
      ],
      slug: "engineering-hardware"  
    },
    {
      id: 3,
      name: "Abrasives",
      // category: "Engineering Hardware",
      mainCategorySlug: "engineering-hardware",
      image: "/Abrasives-2.png",
      bullets: [
        // "Grinding wheels",
        // "Cut-off wheels",
        // "Flap discs",
        // "Wire brushes"
      ],
      slug: "engineering-hardware"
    },
    {
      id: 4,
      name: "Pharma Aluminium Bags",
      // category: "Sterile Packaging",
      image: "/Aluminiumbags.png",
      bullets: [
        // "High-density moisture barrier",
        // "Compliant for pharma storage"
      ],
      slug: "pharma-materials"
    },

    {
      id: 5,
      name: "Industrial Valves",
      // category: "Industrial Valves",
      mainCategorySlug: "industrial-valves",
      image: "/valves.png",
      bullets: [
        // "IBR Certified",
        // "High-quality materials"
      ],
      slug: "industrial-valves"
    },
  ];

  // Auto-play timer for hero feature slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">

      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800 overflow-hidden flex items-center justify-center w-full py-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>

          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(239, 68, 68, 0.1) 35px,
              rgba(239, 68, 68, 0.1) 36px
            )`
          }}></div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column - Hero Copy with Transparent Branding */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="mb-6 flex items-center justify-center lg:justify-start space-x-3 bg-transparent">
                <span className="inline-flex items-center text-slate-200 text-sm font-semibold tracking-wide">
                  <Award className="h-5 w-5 mr-2 text-amber-400" />
                  Trusted Since 2008
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                One stop solution for <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  IBR Pipes, Fittings, Valves & Industrial Supplies
                </span>
              </h1>
              <br />

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => window.dispatchEvent(new Event('openProductCategoriesDropdown'))}
                  className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3.5 rounded-xl font-bold text-base hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center"
                >
                  Browse Catalog
                  <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to="/contact"
                  className="border-2 border-white/80 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-white hover:text-red-900 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  Request Quote
                </Link>
              </div>
            </div>

            {/* Right Column - Hero Side Slider Card */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
              {/* <div className="bg-slate-950/90 border border-slate-800/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative"> */}
              {/* <div className="bg-[rgba(237,223,202,0.8)] border border-[rgba(237,223,202,0.4)] backdrop-blur-md rounded-2xl p-6 shadow-2xl relative"> */}
              <div className="bg-slate-900/60 border border-red-500/20 backdrop-blur-xl rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
              {/* <div className="bg-red-950/40 border border-red-500/30 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative"> */}
              {/* <div className="bg-slate-950/80 border border-slate-800 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative"> */}


                {/* Header Info */}
                <div className="flex justify-between items-center mb-4">
                  {/* <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
                    Featured Highlight
                  </span> */}
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <button 
                        onClick={prevSlide}
                        className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={nextSlide}
                        className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                        aria-label="Next Slide"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Clickable Slider Image Window */}
                <Link 
                  to={`/category/${featuredProducts[currentSlide].slug}`}
                  className="group block relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-slate-800 cursor-pointer"
                >
                  <img
                    src={featuredProducts[currentSlide].image}
                    alt={featuredProducts[currentSlide].name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block text-[10px] font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded mb-1">
                      {featuredProducts[currentSlide].category}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-snug group-hover:text-amber-300 transition-colors">
                      {featuredProducts[currentSlide].name}
                    </h3>
                  </div>
                </Link>

                {/* Dynamic Bullet Points */}
                <div className="space-y-2 mb-4">
                  {featuredProducts[currentSlide].bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Card Action Link & Dots */}
                <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                  <Link
                    to={`/category/${featuredProducts[currentSlide].slug}`}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center group"
                  >
                    View Product Specs
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex space-x-1">
                    {featuredProducts.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentSlide === idx ? "w-5 bg-red-500" : "w-1.5 bg-slate-700"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      Features Section
      <div className="py-20 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Industry Leaders Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Excellence through innovation, quality, and unmatched service standards.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-red-100">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-orange-100">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Truck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Swift Delivery</h3>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-purple-100">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Expertise</h3>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-green-100">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Support</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
