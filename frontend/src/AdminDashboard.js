import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Edit, Plus, Trash2, List } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* List Products Card */}
          <Link to="/admin/list" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
              <List className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">List Products</h2>
            <p className="text-gray-600">View and manage all products by category</p>
          </Link>

          {/* Edit Items Card */}
          <Link to="/admin/edit" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-500 text-white mb-4">
              <Edit className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Edit Items</h2>
            <p className="text-gray-600">Modify existing products and their details</p>
          </Link>

          {/* Add New Items Card */}
          <Link to="/admin/add" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4">
              <Plus className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Add New Items</h2>
            <p className="text-gray-600">Add new products, categories, or brands</p>
          </Link>

          {/* Remove Items Card */}
          <Link to="/admin/remove" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white mb-4">
              <Trash2 className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Remove Items</h2>
            <p className="text-gray-600">Delete products, categories, or brands</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 