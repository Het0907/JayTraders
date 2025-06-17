import React, { useEffect, useState } from 'react';
import { useCart } from './context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, fetchCart, removeFromCart, updateQuantity, error, loading } = useCart();
  const [itemQuantities, setItemQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  // Initialize quantities when cart changes
  useEffect(() => {
    const quantities = {};
    cart.forEach(item => {
      quantities[item._id] = item.quantity;
    });
    setItemQuantities(quantities);
  }, [cart]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) return;
    
    setItemQuantities(prev => ({ ...prev, [itemId]: quantity }));
    await updateQuantity(itemId, quantity);
  };

  const handleRemoveItem = async (itemId) => {
    const success = await removeFromCart(itemId);
    if (!success) {
      // If removal failed, refresh the cart to ensure consistency
      fetchCart();
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.map((item) => (
        <div key={item._id} className="flex justify-between items-center p-4 border-b">
          <div className="flex-1">
            <p className="font-semibold">{item.product.name}</p>
            <p className="text-gray-600">Size: {item.variant.size}</p>
            <div className="flex items-center mt-2">
              <label className="mr-2">Quantity:</label>
              <input
                type="number"
                min="1"
                max={item.variant.stock}
                value={itemQuantities[item._id] || item.quantity}
                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                className="w-16 px-2 py-1 border rounded"
              />
            </div>
            <p className="text-gray-600 mt-1">
              Price: ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => handleRemoveItem(item._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-4"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 p-4 border-t">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">
            Total: ${cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}
          </p>
          <button
            onClick={() => {
              console.log('Proceeding to checkout');
              navigate('/checkout');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 