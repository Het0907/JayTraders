import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    companyName: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });
  const [editablePhone, setEditablePhone] = useState('');

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      toast.error('Please login to view profile');
      navigate('/login');
      return;
    }
    // Set the user data from the stored user object
    const currentUserData = userData.user || userData;
    setUser(currentUserData);
    setEditablePhone(currentUserData.phone || '');

    // Get saved addresses from localStorage
    const savedAddresses = JSON.parse(localStorage.getItem(`addresses_${currentUserData.email || currentUserData.user?.email}`)) || [];
    setAddresses(savedAddresses);
  }, [navigate]);

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhoneChange = (e) => {
    setEditablePhone(e.target.value);
  };

  const handleUpdateProfile = () => {
    if (!editablePhone) {
      toast.error('Mobile number cannot be empty.');
      return;
    }
    // Update user object with new phone number
    const updatedUser = { ...user, phone: editablePhone };
    setUser(updatedUser);

    // Also update localStorage
    // Assuming the user object in localStorage might be nested or direct
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      if (storedUser.user) {
        // If user object is nested, update nested user
        localStorage.setItem('user', JSON.stringify({ ...storedUser, user: { ...storedUser.user, phone: editablePhone } }));
      } else {
        // If user object is direct
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
    toast.success('Mobile number updated successfully!');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    
    if (!newAddress.companyName || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      toast.error('Please fill all address fields including Company Name');
      return;
    }

    const updatedAddresses = [...addresses];
    
    // If this is set as default, remove default from other addresses
    if (newAddress.isDefault) {
      updatedAddresses.forEach(addr => addr.isDefault = false);
    }
    
    // If this is the first address, make it default
    if (updatedAddresses.length === 0) {
      newAddress.isDefault = true;
    }

    updatedAddresses.unshift(newAddress);
    setAddresses(updatedAddresses);
    
    // Save to localStorage using the correct email
    const userEmail = user.email || user.user?.email;
    localStorage.setItem(`addresses_${userEmail}`, JSON.stringify(updatedAddresses));
    
    // Reset form
    setNewAddress({
      companyName: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
    
    toast.success('Address added successfully');
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    const userEmail = user.email || user.user?.email;
    localStorage.setItem(`addresses_${userEmail}`, JSON.stringify(updatedAddresses));
    toast.success('Address deleted successfully');
  };

  const handleSetDefault = (index) => {
    const updatedAddresses = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index
    }));
    setAddresses(updatedAddresses);
    const userEmail = user.email || user.user?.email;
    localStorage.setItem(`addresses_${userEmail}`, JSON.stringify(updatedAddresses));
    toast.success('Default address updated');
  };

  if (!user) return null;

  // Get the correct user data fields
  const userName = user.name || user.user?.name;
  const userEmail = user.email || user.user?.email;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        
        {/* User Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{userName}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{userEmail}</p>
            </div>
              <div>
              <label className="block text-gray-600 mb-2">Mobile Number</label>
              <input
                type="text"
                name="phone"
                value={editablePhone}
                onChange={handlePhoneChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-full mt-4">
              <button
                onClick={handleUpdateProfile}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Personal Information
              </button>
              </div>
          </div>
        </div>

        {/* Address Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Manage Addresses</h2>
          
          {/* Address List */}
          <div className="space-y-4 mb-8">
            {addresses.map((address, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{address.companyName ? `${address.companyName}, ` : ''}{address.street}</p>
                    <p>{address.city}, {address.state} - {address.pincode}</p>
                    {address.isDefault && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
                        Default Address
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(index)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAddress(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add New Address Form */}
          <form onSubmit={handleAddAddress}>
            <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={newAddress.companyName}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={newAddress.pincode}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="isDefault"
                checked={newAddress.isDefault}
                onChange={handleAddressChange}
                className="mr-2"
              />
              <label>Set as default address</label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile; 