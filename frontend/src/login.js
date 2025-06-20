import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import API_ENDPOINTS from './config/api';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_ENDPOINTS.AUTH}/login`, formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('Login successful!');
        window.location.href = '/home';
      } else {
        setError('Login failed: No token received');
        toast.error('Login failed: No token received');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please check your credentials.');
        toast.error(error.response.data.message || 'Login failed');
      } else {
        setError('An error occurred. Please try again.');
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
      token: credentialResponse.credential,
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/home';
    })
    .catch(() => {
      alert('Google sign-in failed');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-4">
      {/* Optional Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-red-200 animate-pulse opacity-20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl px-8 py-10 border border-red-100">
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="h-20 w-20 mx-auto bg-white shadow-lg rounded-xl flex items-center justify-center ring-1 ring-red-100">
            <img className="h-12 w-auto" src="/logo.png" alt="JayTraders Logo" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Welcome Back</h2>
          <p className="text-sm text-gray-500">Sign in to continue to JayTraders</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-inner bg-white/80 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-inner bg-white/80 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="h-4 w-4 mr-2 text-red-500 rounded border-gray-300" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-red-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md ${
              isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.02]'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* OR Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm text-gray-500 bg-white px-2">
              Or continue with
            </div>
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => alert('Google sign-in failed')}
              theme="outline"
              size="large"
              width="100%"
            />
          </div>
        </form>

        {/* Sign Up Redirect */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-red-600 hover:underline">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
