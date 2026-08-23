import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [loading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch {}
    }, [cart]);

    const addToCart = async (productId, variantId, quantity = 1) => {
        try {
            setError(null);
            setCart(prevCart => {
                const existingIndex = prevCart.findIndex(
                    item => item.productId === productId && item.variantId === variantId
                );
                if (existingIndex > -1) {
                    const updated = [...prevCart];
                    updated[existingIndex].quantity += Number(quantity) || 1;
                    return updated;
                }
                return [...prevCart, { productId, variantId, quantity: Number(quantity) || 1 }];
            });
            return true;
        } catch (err) {
            setError('Failed to add item to cart');
            return false;
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            setError(null);
            setCart(prevCart => prevCart.filter(item => item._id !== itemId && item.productId !== itemId));
            return true;
        } catch (err) {
            setError('Failed to remove item from cart');
            return false;
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            setError(null);
            const num = Number(quantity);
            if (num <= 0) {
                return removeFromCart(itemId);
            }
            setCart(prevCart =>
                prevCart.map(item =>
                    (item._id === itemId || item.productId === itemId) ? { ...item, quantity: num } : item
                )
            );
            return true;
        } catch (err) {
            setError('Failed to update quantity');
            return false;
        }
    };

    const clearCart = async () => {
        try {
            setError(null);
            setCart([]);
            localStorage.removeItem('cart');
            return true;
        } catch (err) {
            setError('Failed to clear cart');
            return false;
        }
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);
    };

    const value = {
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;