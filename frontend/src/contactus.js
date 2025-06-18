import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Send, Building2, User, MessageSquare, CheckCircle, ChevronDown, Menu, ShoppingBag, X, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import API_ENDPOINTS from './config/api';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false);

    try {
      const response = await axios.post(`${API_ENDPOINTS.BASE_URL}/api/contact`, formData);
      
      if (response.status === 200) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        console.error('Form submission failed with status:', response.status, response.data);
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response?.data?.message || 'Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-700 to-red-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Contact <span className="text-red-200">Us</span>
            </h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6 flex items-center">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <h3 className="text-green-800 font-semibold">Message Sent Successfully!</h3>
              <p className="text-green-700">We'll get back to you within 24 hours.</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="flex items-center mb-8">
                <MessageSquare className="w-8 h-8 text-red-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-800">Send Us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {isSubmitted && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Your message has been sent successfully! We'll get back to you soon.</span>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="Enter company name"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="engineering-hardware">Engineering Hardware Inquiry</option>
                    <option value="pharma-materials">Pharma Materials Inquiry</option>
                    <option value="ibr-certified">IBR Certified Materials</option>
                    <option value="quotation">Request Quotation</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-red-600 text-white text-lg font-semibold shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <Send className="w-5 h-5 mr-3" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">+91 9925031497</p>
                    <p className="text-gray-600">+91 9904301497</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">jaytraders2008@yahoo.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">
                      303/1/2 Makarpura GIDC <br />
                      Near BSNL telephone Exchange <br />
                      Vadodara, Gujarat 390010 <br />
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Quick Contact
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border border-red-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Need Immediate Assistance?</h3>
              <p className="text-gray-700 mb-6">
                For urgent inquiries or immediate support, give us a call directly.
              </p>
              <a
                href="tel:+91[YourNumber]"
                className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </div> */}

            {/* Embedded Google Map */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="h-[338px] w-full">
                <iframe
                  title="Jay Traders Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29544.57294778869!2d73.14676148499771!3d22.237361305623025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5ba7c433639%3A0x5bafe9e02689852c!2sJAY%20TRADERS!5e0!3m2!1sen!2sin!4v1748092120258!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pb-16">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Need immediate suport?</h2>
            <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
              For urgent inquiries or immediate support, give us a call directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+91[YourNumber]"
                className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </a>
              <a
                href="jaytraders2008@yahoo.com"
                className="inline-flex items-center bg-red-800 text-white px-8 py-4 rounded-xl hover:bg-red-900 transition-colors font-semibold shadow-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;