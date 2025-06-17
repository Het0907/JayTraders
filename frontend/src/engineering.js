import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, ShoppingBag, X, Phone, Mail, MapPin, ArrowRight, Shield, Truck, Award, Users, Search, Home, ChevronRight } from "lucide-react";
import axios from 'axios';

export default function EngineeringHardwarePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories', {
          params: {
            parentCategory: 'engineering' // This will fetch all engineering subcategories
          }
        });
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const productCategories = [
    {
      name: "Fasteners & Fixings",
      image: "/images/categories/fasteners.png",
      fallbackIcon: "🔩",
      subcategories: 12,
      description: "Bolts, screws, nuts, washers and fixing solutions"
    },
    {
      name: "Bearings & Power Transmission",
      image: "/images/categories/bearings.png",
      fallbackIcon: "⚙️",
      subcategories: 8,
      description: "Ball bearings, roller bearings, chains and belts"
    },
    {
      name: "Gaskets & Seals",
      image: "/images/categories/gaskets.png",
      fallbackIcon: "🔧",
      subcategories: 6,
      description: "O-rings, gaskets, sealing compounds and solutions"
    },
    {
      name: "Valves & Fittings",
      image: "/images/categories/valves.png",
      fallbackIcon: "🚰",
      subcategories: 10,
      description: "Industrial valves, pipe fittings and connections"
    },
    {
      name: "Welding rods",
      image: "/Hardware/weldingrod.png",
      // fallbackIcon: "⚒️",
      subcategories: 3,
      description: "Premium welding electrodes for superior arc stability"
    },
    {
      name: "Industrial Tools",
      image: "/images/categories/tools.png",
      fallbackIcon: "🔨",
      subcategories: 15,
      description: "Hand tools, power tools, measuring instruments"
    },
    {
      name: "Metal Sheets & Bars",
      image: "/images/categories/metal-sheets.png",
      fallbackIcon: "📐",
      subcategories: 7,
      description: "Steel sheets, aluminum bars, metal fabrication materials"
    },
    {
      name: "Pneumatic Components",
      image: "/images/categories/pneumatic.png",
      fallbackIcon: "💨",
      subcategories: 9,
      description: "Air compressors, cylinders, valves, and pneumatic tools"
    },
    {
      name: "Lubricants & Chemicals",
      image: "/images/categories/lubricants.png",
      fallbackIcon: "🧪",
      subcategories: 8,
      description: "Industrial oils, greases, cleaning chemicals"
    },
    {
      name: "Safety Equipment",
      image: "/images/categories/safety.png",
      fallbackIcon: "🦺",
      subcategories: 11,
      description: "PPE, safety gear, protective equipment"
    },
    {
      name: "Electrical Components",
      image: "/images/categories/electrical.png",
      fallbackIcon: "⚡",
      subcategories: 13,
      description: "Switches, connectors, cables, electrical fittings"
    },
    {
      name: "Hydraulic Components",
      image: "/images/categories/hydraulic.png",
      fallbackIcon: "🔧",
      subcategories: 6,
      description: "Hydraulic pumps, cylinders, hoses and fittings"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Navigation */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              {/* Your Logo */}
              <div className="flex items-center mr-4">
                <div className="relative">
                  <img src="/logo.png" alt="Jay Traders Logo" className="h-12 w-12" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">                  Jay Traders
                </h1>
                {/* <p className="text-xs text-gray-500">Industrial Excellence</p> */}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 relative group">
                Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 relative group">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
              <Link to="/contactus" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 relative group">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
              
              

              {/* Product Category Dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 group"
                  onClick={toggleDropdown}
                >
                  Product Categories
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-200"></span>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-10 animate-fade-in">
                    <div className="py-2">
                      <Link to="/engineering-hardware" className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group" onClick={() => setIsDropdownOpen(false)}>
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                        Engineering Hardware
                        <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <Link to="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                        Pharma Materials
                        <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <Link to="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                        IBR Materials
                        <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Link to="/cart" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 relative group flex items-center">
                  <ShoppingBag className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse">{cart.length}</span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700 focus:outline-none p-2">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-slide-down">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">Home</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">About Us</Link>
              <Link to="/contactus" className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">Contact Us</Link>
              <div className="py-2">
                <button 
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  onClick={toggleDropdown}
                >
                  <span>Product Categories</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="pl-6 mt-2 space-y-1">
                    <Link to="/engineering-hardware" className="block py-2 text-gray-600 hover:text-red-600 transition-colors" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>Engineering Hardware</Link>
                    <Link to="#" className="block py-2 text-gray-600 hover:text-red-600 transition-colors">Pharma Materials</Link>
                    <Link to="#" className="block py-2 text-gray-600 hover:text-red-600 transition-colors">IBR Materials</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Login Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-center">
            <span className="inline-flex items-center text-blue-700">
              <Users className="h-4 w-4 mr-2" />
              <span className="font-medium">Login / Register</span> to access your benefits and personalized pricing
            </span>
          </div>
        </div>
      </div>

      {/* Search and Menu Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Menu className="h-5 w-5 mr-2 text-gray-600" />
              <span className="text-gray-700 font-medium">Menu</span>
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by keyword, manufacturer part no. or JT part no."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-red-600">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Home className="h-4 w-4 text-gray-400" />
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 font-medium">Engineering Materials & Industrial Hardware</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Engineering Materials & Industrial Hardware</h1>
            <button 
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Show <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
            Used in manufacturing, research and development as well as hobby making and DIY, engineering materials are raw form materials in a range of shapes 
            and sizes. Available in metals, rubber, ceramic, carbon fibre and plastics, these raw form materials can be used to create almost anything.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/category/${category.slug}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-4xl">
                        {category.fallbackIcon || '📦'}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {category.description}
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>{category.subcategories || 0} subcategories</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold">JT</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Jay Traders</h3>
                  <p className="text-gray-400 text-sm">Industrial Excellence</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">Leading supplier of premium industrial materials, serving businesses across India with quality, reliability, and innovation.</p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 cursor-pointer transition-colors">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-red-400 transition-colors">About Us</a>
                <a href="#" className="block text-gray-400 hover:text-red-400 transition-colors">Our Products</a>
                <a href="#" className="block text-gray-400 hover:text-red-400 transition-colors">Quality Assurance</a>
                <a href="#" className="block text-gray-400 hover:text-red-400 transition-colors">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-red-400 transition-colors">News & Updates</a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-left">Contact Info</h4>
              <div className="space-y-3 text-left">
                <p className="flex items-start text-gray-400">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 text-red-400" />
                  <span>
                    303/1/2 Makarpura GIDC <br />
                    Near BSNL telephone exchange <br />
                    Vadodara, Gujarat, India
                  </span>
                </p>
                <p className="flex items-start text-gray-400">
                  <Phone className="h-4 w-4 mr-2 text-red-400" />
                  <span>
                    +91-9925031497 <br />
                    +91-9904301497
                  </span>
                </p>
                <p className="flex items-start text-gray-400">
                  <Mail className="h-4 w-4 mr-2 text-red-400" />
                  <span>jaytraders2008@yahoo.com</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2025 Jay Traders. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}