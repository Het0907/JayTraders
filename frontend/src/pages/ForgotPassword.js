import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import API_ENDPOINTS from '../config/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${API_ENDPOINTS.AUTH}/forgot-password`, { email });
      setIsSent(true);
      toast.success('Password reset link sent! Please check your email.');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to send reset link. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl px-8 py-10 border border-red-100">
        <div className="text-center mb-6">
          <div className="h-20 w-20 mx-auto bg-white shadow-lg rounded-xl flex items-center justify-center ring-1 ring-red-100">
            <img className="h-12 w-auto" src="/logo.png" alt="JayTraders Logo" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Forgot Password</h2>
          <p className="text-sm text-gray-500">Enter your email to receive a password reset link.</p>
        </div>
        {isSent ? (
          <div className="bg-green-100 text-green-700 border border-green-300 p-3 rounded-md mb-4 text-sm text-center">
            If an account exists for <b>{email}</b>, a reset link has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-inner bg-white/80 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md ${
                isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.02]'
              }`}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-gray-600">
          <Link to="/login" className="font-semibold text-red-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword; 