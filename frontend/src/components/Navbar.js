import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Menu,
    X,
    ChevronDown,
    ArrowRight,
    Home,
    Info,
    Phone,
    Cog,
    FlaskConical,
    Gauge,
    Grid,
    ChevronRight,
    CircleDot,
    Cylinder,
    FileDown
} from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();

    const dropdownRef = useRef(null);
    const dropdownBtnRef = useRef(null);

    // Listen for custom event to open product categories dropdown
    useEffect(() => {
        const openDropdown = () => setIsDropdownOpen(true);
        window.addEventListener('openProductCategoriesDropdown', openDropdown);
        return () => window.removeEventListener('openProductCategoriesDropdown', openDropdown);
    }, []);

    // Click outside to close dropdown (desktop only)
    useEffect(() => {
        if (!isDropdownOpen) return;
        function handlePointerDown(event) {
            if (window.innerWidth < 768) return;
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                dropdownBtnRef.current &&
                !dropdownBtnRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('pointerdown', handlePointerDown);
        return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, [isDropdownOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const isActiveLink = (path) => {
        if (path === '/' || path === '/home') {
            return location.pathname === '/' || location.pathname === '/home';
        }
        return location.pathname.startsWith(path);
    };

    const categoryList = [
        {
            title: "Industrial Pipes",
            slug: "industrial-pipes",
            description: "IBR certified pressure plates, boiler pipes & thermal fittings.",
            icon: Cylinder,
            color: "from-slate-600 to-cyan-700",
            lightBg: "bg-cyan-50 text-cyan-700"
        },
        {
            title: "IBR Pipe Fittings",
            slug: "ibr-materials",
            description: "IBR certified pressure plates, boiler pipes & thermal fittings.",
            icon: Gauge,
            color: "from-amber-500 to-orange-600",
            lightBg: "bg-amber-50 text-amber-600"
        },
        {
            title: "Industrial Valves",
            slug: "industrial-valves",
            description: "Gate, globe, and pneumatic actuator valves for fluid control.",
            icon: CircleDot,
            color: "from-violet-500 to-blue-600",
            lightBg: "bg-violet-50 text-violet-600"
        },
        {
            title: "Engineering Hardware",
            slug: "engineering-hardware",
            description: "Welding rods, Taparia hand tools, precision drills & tapsets.",
            icon: Cog,
            color: "from-red-500 to-rose-600",
            lightBg: "bg-red-50 text-red-600"
        },
        {
            title: "Pharma Materials",
            slug: "pharma-materials",
            description: "Pharma grade aluminum bags for sterile storage and transport.",
            icon: FlaskConical,
            color: "from-blue-500 to-indigo-600",
            lightBg: "bg-blue-50 text-blue-600"
        }
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-xs">
            {/* Full-Width Main Navbar Container */}
            <div className="w-full px-4 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-24">
                    
                    {/* LEFT SECTION: Nav Links with Animated Underlines */}
                    <div className="hidden md:flex items-center space-x-4 lg:space-x-8 flex-1 justify-start">
                        <Link
                            to="/home"
                            className={`relative group py-2 flex items-center space-x-2 text-base font-semibold transition-colors duration-200 ${
                                isActiveLink('/home') ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                            }`}
                        >
                            <Home className="h-5 w-5 text-red-600" />
                            <span>Home</span>
                            <span
                                className={`absolute bottom-0 left-0 h-0.5 bg-red-600 rounded-full transition-all duration-300 ${
                                    isActiveLink('/home') ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}
                            ></span>
                        </Link>

                        <Link
                            to="/about"
                            className={`relative group py-2 flex items-center space-x-2 text-base font-semibold transition-colors duration-200 ${
                                isActiveLink('/about') ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                            }`}
                        >
                            <Info className="h-5 w-5 text-red-600" />
                            <span>About Us</span>
                            <span
                                className={`absolute bottom-0 left-0 h-0.5 bg-red-600 rounded-full transition-all duration-300 ${
                                    isActiveLink('/about') ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}
                            ></span>
                        </Link>

                        <Link
                            to="/contact"
                            className={`relative group py-2 flex items-center space-x-2 text-base font-semibold transition-colors duration-200 ${
                                isActiveLink('/contact') ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                            }`}
                        >
                            <Phone className="h-5 w-5 text-red-600" />
                            <span>Contact Us</span>
                            <span
                                className={`absolute bottom-0 left-0 h-0.5 bg-red-600 rounded-full transition-all duration-300 ${
                                    isActiveLink('/contact') ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}
                            ></span>
                        </Link>
                    </div>

                    {/* CENTER SECTION: Clean, Unboxed Brand Logo & Red Title */}
                    <div className="flex items-center justify-center flex-1">
                        <Link 
                            to="/" 
                            className="flex items-center space-x-3.5 group"
                        >
                            <img
                                src="/logo.png"
                                alt="Jay Traders Logo"
                                className="h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                            />
                            <span className="text-3xl sm:text-4xl font-black tracking-tight text-red-600 group-hover:text-red-700 transition-colors">
                                Jay Traders
                            </span>
                        </Link>
                    </div>

                    {/* RIGHT SECTION: Brochure & Product Categories Buttons */}
                    <div className="hidden md:flex items-center justify-end space-x-3 lg:space-x-4 flex-1">
                        
                        {/* Download Brochure Button */}
                        <a
                            href="/brochure.pdf"
                            download="Jay_Traders_Brochure.pdf"
                            className="flex items-center space-x-2.5 px-4 py-3 rounded-xl text-base font-semibold text-gray-700 bg-gray-50 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 transition-all duration-200 shadow-xs"
                        >
                            <FileDown className="h-5 w-5 text-red-600" />
                            <span>Brochure</span>
                        </a>

                        {/* Product Categories Dropdown */}
                        <div className="relative">
                            <button
                                ref={dropdownBtnRef}
                                onClick={toggleDropdown}
                                className={`flex items-center space-x-2.5 px-5 py-3 rounded-xl text-base font-semibold border transition-all duration-200 focus:outline-none shadow-xs ${
                                    isDropdownOpen || location.pathname.startsWith('/category')
                                        ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-500/20'
                                        : 'text-gray-700 bg-gray-50 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                                }`}
                            >
                                <Grid className={`h-5 w-5 ${isDropdownOpen || location.pathname.startsWith('/category') ? 'text-white' : 'text-red-600'}`} />
                                <span>Product Categories</span>
                                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu Panel */}
                            {isDropdownOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-0 mt-3 w-96 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 p-3.5 animate-fade-in divide-y divide-gray-100"
                                >
                                    <div className="px-3 py-2 flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Explore Catalog</span>
                                    </div>

                                    <div className="py-2 space-y-1.5">
                                        {categoryList.map((cat) => {
                                            const IconComp = cat.icon;
                                            return (
                                                <Link
                                                    key={cat.slug}
                                                    to={`/category/${cat.slug}`}
                                                    className="flex items-start p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                                                    onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}
                                                >
                                                    <div className={`p-2.5 rounded-xl ${cat.lightBg} group-hover:scale-110 transition-transform duration-200 mr-3.5 shadow-xs`}>
                                                        <IconComp className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex-1 pr-2">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                                                                {cat.title}
                                                            </h4>
                                                            <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                                                            {cat.description}
                                                        </p>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    <div className="pt-2 px-1">
                                        <Link
                                            to="/contact"
                                            className="flex items-center justify-between w-full p-3 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100/80 rounded-xl transition-colors group"
                                            onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}
                                        >
                                            <span>Need a custom bulk quotation?</span>
                                            <div className="flex items-center space-x-1 font-bold">
                                                <span>Contact Us</span>
                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Navigation Toggle Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-3 rounded-xl bg-gray-50 text-gray-700 hover:text-red-600 hover:bg-red-50 border border-gray-200 transition-colors"
                        >
                            {isMenuOpen ? <X className="h-7 w-7 text-red-600" /> : <Menu className="h-7 w-7 text-red-600" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <nav className="md:hidden border-t border-gray-100 bg-white px-5 pt-4 pb-6 shadow-xl animate-slide-down">
                    <div className="flex flex-col space-y-2.5">
                        <Link
                            to="/home"
                            className={`flex items-center space-x-3.5 p-3.5 rounded-xl text-lg font-semibold transition-colors ${
                                isActiveLink('/home') ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={toggleMenu}
                        >
                            <Home className="h-6 w-6 text-red-600" />
                            <span>Home</span>
                        </Link>

                        <Link
                            to="/about"
                            className={`flex items-center space-x-3.5 p-3.5 rounded-xl text-lg font-semibold transition-colors ${
                                isActiveLink('/about') ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={toggleMenu}
                        >
                            <Info className="h-6 w-6 text-red-600" />
                            <span>About Us</span>
                        </Link>

                        <Link
                            to="/contact"
                            className={`flex items-center space-x-3.5 p-3.5 rounded-xl text-lg font-semibold transition-colors ${
                                isActiveLink('/contact') ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={toggleMenu}
                        >
                            <Phone className="h-6 w-6 text-red-600" />
                            <span>Contact Us</span>
                        </Link>

                        {/* Mobile Download Brochure Button */}
                        <a
                            href="/brochure.pdf"
                            download="Jay_Traders_Brochure.pdf"
                            className="flex items-center space-x-3.5 p-3.5 rounded-xl text-lg font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                            onClick={toggleMenu}
                        >
                            <FileDown className="h-6 w-6 text-red-600" />
                            <span>Download Brochure</span>
                        </a>

                        <div className="pt-2 border-t border-gray-100">
                            <button
                                onClick={toggleDropdown}
                                className={`flex items-center justify-between w-full p-3.5 rounded-xl text-lg font-semibold border transition-colors ${
                                    isDropdownOpen ? 'text-red-600 bg-red-50 border-red-200' : 'text-gray-700 bg-gray-50 border-gray-200 hover:bg-red-50 hover:text-red-600'
                                }`}
                            >
                                <div className="flex items-center space-x-3.5">
                                    <Grid className="h-6 w-6 text-red-600" />
                                    <span>Product Categories</span>
                                </div>
                                <ChevronDown className={`h-6 w-6 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="mt-2 ml-4 pl-4 border-l-2 border-red-100 space-y-2 py-2">
                                    {categoryList.map((cat) => {
                                        const IconComp = cat.icon;
                                        return (
                                            <Link
                                                key={cat.slug}
                                                to={`/category/${cat.slug}`}
                                                className="flex items-center space-x-3.5 p-3 rounded-lg text-base font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}
                                            >
                                                <IconComp className="h-5 w-5 text-red-500" />
                                                <span>{cat.title}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            )}

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-8px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .animate-slide-down {
                    animation: slide-down 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </header>
    );
};

export default Navbar;