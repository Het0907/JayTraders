import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, ShoppingBag, X, Phone, Mail, MapPin, ArrowRight, Shield, Truck, Award, Users, ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function IndustrialHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Product data for carousel
  const products = [
    {
      id: 1,
      name: "IBR/Non-IBR pipe & fittings",
      category: "IBR Materials",
      image: "IBR.jpeg",
      price: "",
      rating: 4.8,
      description: "High-grade stainless steel hex bolts for heavy-duty applications",
      specifications: ["Grade A2-70", "M6 to M30", "ISO 4762 Standard"]
    },
    {
      id: 2,
      name: "Power tools & Machines",
      category: "Engineering Hardware",
      image: "powertools.png",
      price: "",
      description: "GMP compliant stainless steel pipes for pharmaceutical industry",
      specifications: ["316L Grade", "Electropolished", "FDA Approved"]
    },
    {
      id: 3,
      name: "All types if Welding rods",
      category: "Engineering Hardware",
      image: "weldingrod.png",
      price: "₹8,500/piece",
      rating: 4.7,
      description: "IBR certified pressure vessel plates for boiler applications",
      specifications: ["IS 2062 Grade", "IBR Approved", "High Temperature Resistant"]
    },
    {
      id: 4,
      name: "IBR/NIBR valves",
      category: "IBR Materials",
      image: "valves.png",
      price: "₹150/piece",
      rating: 4.6,
      description: "Premium quality gaskets for industrial sealing applications",
      specifications: ["PTFE Material", "Temperature: -200°C to 260°C", "Various Sizes"]
    },
    {
      id: 5,
      name: "Taparia tools",
      category: "Engineering Hardware",
      image: "taparia.jpeg",
      price: "₹2,800/piece",
      rating: 4.8,
      description: "High-quality flanges for pipe connections and fittings",
      specifications: ["316 Grade SS", "ANSI B16.5", "Forged Construction"]
    },
    {
      id: 6,
      name: "Abrasives",
      category: "Engineering Hardware",
      image: "abrasives.jpeg",
      price: "₹4,500/piece",
      rating: 4.9,
      description: "Sanitary valves designed for pharmaceutical processes",
      specifications: ["316L SS", "Tri-Clamp Ends", "CIP/SIP Compatible"]
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 3));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(products.length / 3)) % Math.ceil(products.length / 3));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[600px] bg-gradient-to-br from-slate-900 via-red-900 to-slate-800 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Geometric Shapes */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-600/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          
          {/* Diagonal Lines */}
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

        {/* Bottom Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/50 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 mb-4">
                <Award className="h-4 w-4 mr-2" />
                Trusted since 2008
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Quality Industrial
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Suppliers
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-red-100 mb-10 max-w-4xl mx-auto leading-relaxed">
              Jay Traders delivers excellence in engineering hardware, pharmaceutical materials, 
              and IBR certified products. Your success is our commitment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/engineering-hardware" className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-4 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center">
                Explore Products
                <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-900 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Carousel Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our premium range of industrial products trusted by leading companies</p>
          </div>

          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)'
                }}
              >
                {Array.from({ length: Math.ceil(products.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-3 gap-8 px-4">
                      {products.slice(slideIndex * 3, slideIndex * 3 + 3).map((product) => (
                        <Link 
                          to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
                          key={product.id} 
                          className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                        >
                          <div className="relative overflow-hidden aspect-square">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                {product.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{product.name}</h3>
                            
                            <div className="flex items-center justify-end">
                              <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 flex items-center">
                                View Products
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index 
                      ? 'bg-red-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {/* <p className="text-gray-600">ISO certified products meeting highest international standards</p> */}
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-orange-100">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Truck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Swift Delivery</h3>
              {/* <p className="text-gray-600">Fast and secure shipping nationwide with tracking</p> */}
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-purple-100">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Expertise</h3>
              {/* <p className="text-gray-600">Decades of experience in industrial supply solutions</p> */}
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-green-100">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Support</h3>
              {/* <p className="text-gray-600">Round-the-clock technical assistance and customer care</p> */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <img src="/logo.png" alt="Jay Traders Logo" className="h-10 w-10 mr-3" />
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
      </footer> */}

      {/* <style jsx>{`
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
   
 */}
<style jsx>{`
  .carousel-container {
    overflow: hidden;
    width: 100%;
  }

  .carousel-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }

  .carousel-slide {
    min-width: 100%; /* or adjust to 33.33% if showing 3 at once */
    flex-shrink: 0;
  }
`}
</style>
</div>
  );
}
