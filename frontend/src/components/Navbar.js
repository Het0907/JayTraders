import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, ChevronDown, ArrowRight, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { cart } = useCart();
    const { isAuthenticated, user, logout } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Add refs for dropdown and button
    const dropdownRef = useRef(null);
    const dropdownBtnRef = useRef(null);

    useEffect(() => {
        if (user) {
            setIsAdmin(user.role === 'admin');
        }
    }, [user]);

    // Listen for custom event to open product categories dropdown
    useEffect(() => {
        const openDropdown = () => setIsDropdownOpen(true);
        window.addEventListener('openProductCategoriesDropdown', openDropdown);
        return () => window.removeEventListener('openProductCategoriesDropdown', openDropdown);
    }, []);

    // Click outside to close dropdown
    useEffect(() => {
        if (!isDropdownOpen) return;
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                dropdownBtnRef.current &&
                !dropdownBtnRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        logout();
        toast.success('Logged out successfully!');
        navigate('/login');
        setShowLogoutConfirm(false);
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const isActiveLink = (path) => {
        if (path === '/' || path === '/home') {
            return location.pathname === '/' || location.pathname === '/home';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <div className="flex items-center mr-4">
                                <div className="relative">
                                    <img src="/logo.png" alt="Jay Traders Logo" className="h-12 w-12" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                    Jay Traders
                                </h1>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/home" className={`relative group ${isActiveLink('/home') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'} font-medium transition-colors duration-200`}>
                            Home
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-200 ${isActiveLink('/home') ? 'w-full' : ''}`}></span>
                        </Link>
                        <Link to="/about" className={`relative group ${isActiveLink('/about') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'} font-medium transition-colors duration-200`}>
                            About Us
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-200 ${isActiveLink('/about') ? 'w-full' : ''}`}></span>
                        </Link>
                        <Link to="/contact" className={`relative group ${isActiveLink('/contact') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'} font-medium transition-colors duration-200`}>
                            Contact Us
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-200 ${isActiveLink('/contact') ? 'w-full' : ''}`}></span>
                        </Link>

                        {/* Product Category Dropdown */}
                        <div className="relative">
                            <button
                                ref={dropdownBtnRef}
                                onClick={toggleDropdown}
                                className={`flex items-center text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 focus:outline-none ${isDropdownOpen ? 'text-red-600' : ''}`}
                            >
                                Product Categories
                                <ChevronDown className="ml-1 h-4 w-4" />
                            </button>
                            {isDropdownOpen && (
                                <div ref={dropdownRef} className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-10 animate-fade-in">
                                    <div className="py-2">
                                        <Link to="/category/engineering-hardware" className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                                            <div className="w-2 h-2 bg-red-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                                            Engineering Hardware
                                            <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                        <Link to="/category/pharma-materials" className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                                            <div className="w-2 h-2 bg-red-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                                            Pharma Materials
                                            <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                        <Link to="/category/ibr-materials" className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                                            <div className="w-2 h-2 bg-red-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                                            IBR Materials
                                            <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <Link to="/cart" className={`relative group flex items-center ${isActiveLink('/cart') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'} font-medium transition-colors duration-200`}>
                                <ShoppingBag className="h-6 w-6" />
                                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse">{cart.length}</span>
                            </Link>
                        </div>

                        {user && (
                            <Link to="/profile" className={`relative group flex items-center ${isActiveLink('/profile') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'} font-medium transition-colors duration-200`}>
                                <User className="h-6 w-6" />
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-200 ${isActiveLink('/profile') ? 'w-full' : ''}`}></span>
                            </Link>
                        )}

                        {isAdmin && (
                            <Link to="/admin" className={`relative group ${isActiveLink('/admin') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'} font-medium transition-colors duration-200`}>
                                Admin Panel
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-200 ${isActiveLink('/admin') ? 'w-full' : ''}`}></span>
                            </Link>
                        )}

                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 relative group"
                            >
                                <LogOut className="h-6 w-6" />
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-200"></span>
                            </button>
                        ) : (
                            <Link to="/login" className={`relative group ${isActiveLink('/login') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'} font-medium transition-colors duration-200`}>
                                Login
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-200 ${isActiveLink('/login') ? 'w-full' : ''}`}></span>
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-700 hover:text-red-600 transition-colors"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t">
                        <div className="flex flex-col space-y-4">
                            <Link
                                to="/home"
                                className={`block ${isActiveLink('/home') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'} transition-colors`}
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className={`block ${isActiveLink('/about') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'} transition-colors`}
                                onClick={toggleMenu}
                            >
                                About Us
                            </Link>
                            <Link
                                to="/contact"
                                className={`block ${isActiveLink('/contact') ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600'} transition-colors`}
                                onClick={toggleMenu}
                            >
                                Contact
                            </Link>
                            <div className="py-2">
                                <button 
                                    className={`flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ${isDropdownOpen ? 'text-red-600' : ''}`}
                                    onClick={toggleDropdown}
                                >
                                    <span>Product Categories</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isDropdownOpen && (
                                    <div className="pl-6 mt-2 space-y-1">
                                        <Link to="/category/engineering-hardware" className="block py-2 text-gray-600 hover:text-red-600 transition-colors" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>Engineering Hardware</Link>
                                        <Link to="/category/pharma-materials" className="block py-2 text-gray-600 hover:text-red-600 transition-colors" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>Pharma Materials</Link>
                                        <Link to="/category/ibr-materials" className="block py-2 text-gray-600 hover:text-red-600 transition-colors" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>IBR Materials</Link>
                                    </div>
                                )}
                            </div>
                            <Link
                                to="/cart"
                                className="text-gray-700 hover:text-red-600 transition-colors"
                                onClick={toggleMenu}
                            >
                                Cart ({cart.length})
                            </Link>
                            {user && (
                                <Link
                                    to="/profile"
                                    className="text-gray-700 hover:text-red-600 transition-colors flex items-center"
                                    onClick={toggleMenu}
                                >
                                    <User className="h-6 w-6 mr-2" />
                                </Link>
                            )}
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="text-gray-700 hover:text-red-600 transition-colors"
                                    onClick={toggleMenu}
                                >
                                    Admin Panel
                                </Link>
                            )}
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-700 hover:text-red-600 transition-colors flex items-center"
                                >
                                    <LogOut className="h-6 w-6 mr-2" />
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-red-600 transition-colors"
                                    onClick={toggleMenu}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </nav>
                )}
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={cancelLogout}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
        </header>
    );
};

export default Navbar; 