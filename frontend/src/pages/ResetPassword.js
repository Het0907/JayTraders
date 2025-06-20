import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import API_ENDPOINTS from '../config/api';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Invalid or missing token.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(`${API_ENDPOINTS.AUTH}/reset-password`, { token, password });
      setSuccess(true);
      toast.success('Password reset successful! You can now log in.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password.');
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
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Reset Password</h2>
          <p className="text-sm text-gray-500">Enter your new password below.</p>
        </div>
        {success ? (
          <div className="bg-green-100 text-green-700 border border-green-300 p-3 rounded-md mb-4 text-sm text-center">
            Your password has been reset! <br />
            <Link to="/login" className="font-semibold text-red-600 hover:underline">Go to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-inner bg-white/80 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-inner bg-white/80 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Confirm new password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md ${
                isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.02]'
              }`}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword; 