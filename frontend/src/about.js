import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Building2, Target, Award, Users, CheckCircle, Phone, Zap, MessageCircle, Trophy, ChevronDown, Menu, ShoppingBag, X, ArrowRight } from 'lucide-react';

const AboutUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-700 to-red-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About <span className="text-red-200">Jay Traders</span>
            </h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
        {/* Company Overview Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100">
          <div className="flex items-center mb-6">
            <Building2 className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Founded in <strong className="text-red-600">2008</strong>, <strong className="text-red-600">Jay Traders</strong> has evolved from a small trading unit into a trusted supplier of industrial-grade materials, serving industries across <strong className="text-red-600">Makarpura GIDC , Padra (Vadodara)</strong>. Our commitment to quality and reliability has made us a preferred partner for businesses seeking excellence in engineering and pharmaceutical materials.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border border-red-200">
            <div className="flex items-center mb-4">
              <Target className="w-7 h-7 text-red-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To provide high-quality, reliable, and affordable engineering and pharmaceutical materials that empower industrial progress and drive innovation across industries.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center mb-4">
              <Award className="w-7 h-7 text-red-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Our Journey</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              From humble beginnings to becoming a reliable name in Engineering Hardware, Pharma Products, and IBR Certified Materials - our growth reflects our dedication to excellence.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What We Offer</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                <span className="text-2xl group-hover:text-white transition-colors duration-300">🛠️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Engineering Hardware</h3>
              {/* <p className="text-gray-600">Premium quality engineering components and hardware solutions for industrial applications.</p> */}
            </div>
            
            <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                <span className="text-2xl group-hover:text-white transition-colors duration-300">💊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pharma Materials</h3>
              {/* <p className="text-gray-600">High-grade pharmaceutical materials meeting international quality standards and regulations.</p> */}
            </div>
            
            <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                <span className="text-2xl group-hover:text-white transition-colors duration-300">🔧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">IBR Certified Materials</h3>
              {/* <p className="text-gray-600">Certified industrial materials complying with Indian Boiler Regulations for safety and reliability.</p> */}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-12 mb-16 text-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Jay Traders?</h2>
            {/* <div className="w-24 h-1 bg-red-200 mx-auto rounded-full"></div> */}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Trusted by Hundreds</h3>
              {/* <p className="text-red-100 text-sm">Hundreds of satisfied clients across various industries</p> */}
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast & Reliable</h3>
              {/* <p className="text-red-100 text-sm">Quick delivery and consistent service you can count on</p> */}
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dedicated Support</h3>
              {/* <p className="text-red-100 text-sm">24/7 customer support for all your queries and needs</p> */}
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality-Centric</h3>
              {/* <p className="text-red-100 text-sm">Uncompromising commitment to quality in every product</p> */}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pb-16">
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
            <a
              href="/contact"
              className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;