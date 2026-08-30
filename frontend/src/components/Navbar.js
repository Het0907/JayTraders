

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
            if (window.innerWidth < 1024) return;
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

    // Shared style for the plain nav-style buttons (Home, About, Contact, Brochure)
    // Bold weight + a soft white text-shadow "halo" keeps them legible over the
    // decorative background images without boxing them in a white pill.
    // NOTE: switched to `lg:` sizing since the desktop nav row itself only
    // appears from the `lg` breakpoint up (see toggle below) — this avoids
    // cramped/overlapping text on tablets (768–1023px).
    const navBtnBase =
        // "relative group flex items-center space-x-2 py-2.5 px-1 text-base xl:text-xl font-extrabold tracking-wide text-[#464f48] transition-colors duration-200 [text-shadow:0_1px_3px_rgba(255,255,255,0.85),0_1px_10px_rgba(255,255,255,0.6)]";
        "relative group flex items-center space-x-2 py-2.5 px-1 text-base xl:text-xl font-extrabold tracking-wide text-slate-700 transition-colors duration-200 [text-shadow:0_1px_3px_rgba(255,255,255,0.85),0_1px_10px_rgba(255,255,255,0.6)]";
    return (
        <header className="sticky top-0 z-50 w-full bg-[#FFFBF0] border-b border-amber-100 shadow-xs">

            {/* Decorative Industrial Background — hidden on mobile/tablet so it
                doesn't clutter the compact header; only shown from lg up where
                there's enough breathing room around the text. */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">

                {/* Valves - left/center */}
                <img
                    src="/navbar/valves.png"
                    alt=""
                    className="absolute left-[0%] top-0 w-[30%] h-full object-cover object-center opacity-[0.55]"
                />

                {/* Engineering Hardware - center-left */}
                <img
                    src="/navbar/engineering-hardware.png"
                    alt=""
                    className="absolute left-[25%] top-0 w-[30%] h-full object-cover object-center opacity-[0.48]"
                />

                {/* Industrial Products - center-right */}
                <img
                    src="/navbar/industrial-navbar.png"
                    alt=""
                    className="absolute left-[48%] top-0 w-[30%] h-full object-cover object-center opacity-[0.40]"
                />

                {/* MS Steel - right */}
                <img
                    src="/navbar/mssteel.png"
                    alt=""
                    className="absolute right-0 top-0 w-[25%] h-full object-cover object-center opacity-[0.30]"
                />

            </div>

            {/* Full-Width Main Navbar Container */}
            <div className="relative w-full px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">

                    {/* LEFT SECTION: Nav Links with Animated Underlines
                        Only shown from `lg` up — at `md` (768px) there simply
                        isn't room for links + centered logo/title + brochure +
                        dropdown in one row without wrapping/overlap. */}
                    <div className="hidden lg:flex items-center space-x-6 xl:space-x-10 flex-1 justify-start">
                        <Link
                            to="/home"
                            className={`${navBtnBase} ${
                                isActiveLink('/home') ? 'text-red-600' : 'text-stone-800 hover:text-red-600'
                            }`}
                        >
                            <Home className="h-5 w-5 text-red-600 shrink-0" />
                            <span className="whitespace-nowrap">Home</span>
                            <span
                                className={`absolute -bottom-0.5 left-0 h-0.5 bg-red-600 rounded-full transition-all duration-300 ${
                                    isActiveLink('/home') ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}
                            ></span>
                        </Link>

                        <Link
                            to="/about"
                            className={`${navBtnBase} ${
                                isActiveLink('/about') ? 'text-red-600' : 'text-stone-800 hover:text-red-600'
                            }`}
                        >
                            <Info className="h-5 w-5 text-red-600 shrink-0" />
                            <span className="whitespace-nowrap">About Us</span>
                            <span
                                className={`absolute -bottom-0.5 left-0 h-0.5 bg-red-600 rounded-full transition-all duration-300 ${
                                    isActiveLink('/about') ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}
                            ></span>
                        </Link>

                        <Link
                            to="/contact"
                            className={`${navBtnBase} ${
                                isActiveLink('/contact') ? 'text-red-600' : 'text-stone-800 hover:text-red-600'
                            }`}
                        >
                            <Phone className="h-5 w-5 text-red-600 shrink-0" />
                            <span className="whitespace-nowrap">Contact Us</span>
                            <span
                                className={`absolute -bottom-0.5 left-0 h-0.5 bg-red-600 rounded-full transition-all duration-300 ${
                                    isActiveLink('/contact') ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}
                            ></span>
                        </Link>
                    </div>

                    {/* CENTER SECTION: Clean, Unboxed Brand Logo & Red Title
                        Text/logo scale in three steps (mobile / sm / lg) instead
                        of jumping straight from base size to text-5xl, so the
                        header never overflows on small or mid-size screens. */}
                    <div className="flex items-center justify-center flex-1 min-w-0">
                        <Link
                            to="/"
                            className="flex items-center space-x-2 sm:space-x-3.5 group min-w-0"
                        >
                            <img
                                src="/logo.png"
                                alt="Jay Traders Logo"
                                className="
                                    h-10 sm:h-14 lg:h-20 w-auto object-contain shrink-0
                                    drop-shadow-[0_2px_3px_rgba(255,255,255,0.9)]
                                    group-hover:scale-105
                                    transition-transform duration-200
                                "
                            />
                            {/* <span className="truncate text-xl sm:text-3xl lg:text-5xl font-black tracking-tight text-red-600 group-hover:text-red-700 transition-colors [text-shadow:0_1px_4px_rgba(255,255,255,0.7)]">
                                Jay Traders
                            </span>
                             */}
                        <span className="font-heading whitespace-nowrap pb-1 leading-normal text-xl sm:text-3xl lg:text-5xl font-black tracking-wide text-red-700">
                            Jay Traders
                        </span>
                        
                        </Link>
                    </div>

                    {/* RIGHT SECTION: Brochure & Product Categories Buttons */}
                    <div className="hidden lg:flex items-center justify-end space-x-6 xl:space-x-10 flex-1">

                        {/* Download Brochure Button - matches plain nav link style now */}
                        <a
                            href="/brochure.pdf"
                            download="Jay_Traders_Brochure.pdf"
                            className={`${navBtnBase} text-stone-800 hover:text-red-600`}
                        >
                            <FileDown className="h-5 w-5 text-red-600 shrink-0" />
                            <span className="whitespace-nowrap">Brochure</span>
                            <span className="absolute -bottom-0.5 left-0 h-0.5 bg-red-600 rounded-full transition-all duration-300 w-0 group-hover:w-full"></span>
                        </a>

                        {/* Product Categories Dropdown - matches plain nav link style now */}
                        <div className="relative">
                            <button
                                ref={dropdownBtnRef}
                                onClick={toggleDropdown}
                                className={`${navBtnBase} focus:outline-none ${
                                    isDropdownOpen || location.pathname.startsWith('/category')
                                        ? 'text-red-600'
                                        : 'text-stone-800 hover:text-red-600'
                                }`}
                            >
                                <Grid className="h-5 w-5 text-red-600 shrink-0" />
                                <span className="whitespace-nowrap">Product Categories</span>
                                <ChevronDown className={`h-5 w-5 transition-transform duration-200 shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                <span
                                    className={`absolute -bottom-0.5 left-0 h-0.5 bg-red-600 rounded-full transition-all duration-300 ${
                                        isDropdownOpen || location.pathname.startsWith('/category') ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}
                                ></span>
                            </button>

                            {/* Dropdown Menu Panel — width is viewport-clamped so it
                                never overflows the right edge on narrower desktop/
                                tablet windows (e.g. split-screen browsers). */}
                            {isDropdownOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-0 mt-3 w-[92vw] max-w-96 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 p-3.5 animate-fade-in divide-y divide-gray-100"
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
                                                    <div className="flex-1 pr-2 min-w-0">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                                                                {cat.title}
                                                            </h4>
                                                            <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 shrink-0" />
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

                    {/* Mobile / Tablet Navigation Toggle Button — now shown up to
                        `lg` (matches the desktop row's `hidden lg:flex`). */}
                    <div className="flex items-center lg:hidden shrink-0">
                        <button
                            onClick={toggleMenu}
                            className="p-2.5 sm:p-3 rounded-xl bg-white/80 text-gray-700 hover:text-red-600 hover:bg-red-50 border border-amber-100 transition-colors"
                        >
                            {isMenuOpen ? <X className="h-6 w-6 sm:h-7 sm:w-7 text-red-600" /> : <Menu className="h-6 w-6 sm:h-7 sm:w-7 text-red-600" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile / Tablet Navigation Drawer */}
            {isMenuOpen && (
                <nav className="lg:hidden border-t border-amber-100 bg-[#FFFBF0] px-4 sm:px-5 pt-4 pb-6 shadow-xl animate-slide-down max-h-[calc(100dvh-4rem)] overflow-y-auto">
                    <div className="flex flex-col space-y-2 sm:space-y-2.5">
                        <Link
                            to="/home"
                            className={`flex items-center space-x-3.5 p-3 sm:p-3.5 rounded-xl text-base sm:text-lg font-bold transition-colors ${
                                isActiveLink('/home') ? 'bg-red-50 text-red-600' : 'text-stone-800 hover:bg-white/70'
                            }`}
                            onClick={toggleMenu}
                        >
                            <Home className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            <span>Home</span>
                        </Link>

                        <Link
                            to="/about"
                            className={`flex items-center space-x-3.5 p-3 sm:p-3.5 rounded-xl text-base sm:text-lg font-bold transition-colors ${
                                isActiveLink('/about') ? 'bg-red-50 text-red-600' : 'text-stone-800 hover:bg-white/70'
                            }`}
                            onClick={toggleMenu}
                        >
                            <Info className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            <span>About Us</span>
                        </Link>

                        <Link
                            to="/contact"
                            className={`flex items-center space-x-3.5 p-3 sm:p-3.5 rounded-xl text-base sm:text-lg font-bold transition-colors ${
                                isActiveLink('/contact') ? 'bg-red-50 text-red-600' : 'text-stone-800 hover:bg-white/70'
                            }`}
                            onClick={toggleMenu}
                        >
                            <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            <span>Contact Us</span>
                        </Link>

                        {/* Mobile Download Brochure Button */}
                        <a
                            href="/brochure.pdf"
                            download="Jay_Traders_Brochure.pdf"
                            className="flex items-center space-x-3.5 p-3 sm:p-3.5 rounded-xl text-base sm:text-lg font-bold text-stone-800 hover:bg-white/70 transition-colors"
                            onClick={toggleMenu}
                        >
                            <FileDown className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            <span>Download Brochure</span>
                        </a>

                        <div className="pt-2 border-t border-amber-100">
                            <button
                                onClick={toggleDropdown}
                                className={`flex items-center justify-between w-full p-3 sm:p-3.5 rounded-xl text-base sm:text-lg font-bold transition-colors ${
                                    isDropdownOpen ? 'text-red-600 bg-red-50' : 'text-stone-800 hover:bg-white/70'
                                }`}
                            >
                                <div className="flex items-center space-x-3.5">
                                    <Grid className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                                    <span>Product Categories</span>
                                </div>
                                <ChevronDown className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="mt-2 ml-3 sm:ml-4 pl-3 sm:pl-4 border-l-2 border-red-100 space-y-2 py-2">
                                    {categoryList.map((cat) => {
                                        const IconComp = cat.icon;
                                        return (
                                            <Link
                                                key={cat.slug}
                                                to={`/category/${cat.slug}`}
                                                className="flex items-center space-x-3.5 p-3 rounded-lg text-sm sm:text-base font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}
                                            >
                                                <IconComp className="h-5 w-5 text-red-500 shrink-0" />
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