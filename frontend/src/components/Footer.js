import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                            Jay Traders
                        </h3>
                        <p className="text-gray-400">
                            Your trusted partner in industrial supplies and equipment.
                        </p>
                        {/* <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </div> */}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-red-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-red-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-red-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-gray-400 hover:text-red-400 transition-colors">
                                    Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/category/engineering-hardware" className="text-gray-400 hover:text-red-400 transition-colors">
                                    Engineering Hardware
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/pharma-materials" className="text-gray-400 hover:text-red-400 transition-colors">
                                    Pharma Material
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/ibr-materials" className="text-gray-400 hover:text-red-400 transition-colors">
                                    IBR Material
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2">
                                <Phone className="h-5 w-5 text-red-400" />
                                <span className="text-gray-400">+91 9925031497</span>
                                <span className="text-gray-400">+91 9904301497</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-red-400" />
                                <span className="text-gray-400">jaytraders2008@gmail.com</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <MapPin className="h-5 w-5 text-red-400 mt-1" />
                                <span className="text-gray-400">
                                    303/1/2 Makarpura GIDC,<br/>
                                    near Telephone exchange,<br/>
                                    Vadodara, 390012
                                    

                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} Jay Traders. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/terms" className="text-gray-400 hover:text-red-400 transition-colors">Terms & Conditions</Link>
                        {/* <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Cookie Policy</a> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 