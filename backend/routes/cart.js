const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Utility: Format Cart for frontend
const formatCart = (cart) => ({
    success: true,
    items: cart.items.map(item => {
        const variant = item.product?.variants?.find(v => v._id.toString() === item.variantId?.toString());
        return {
            _id: item._id,
            product: {
                _id: item.product?._id,
                name: item.product?.name,
                brand: item.product?.brand,
                image: item.product?.image,
                price: variant?.price || 0
            },
            variant: variant ? {
                size: variant.size,
                stock: variant.stock
            } : null,
            quantity: item.quantity,
            totalPrice: variant ? variant.price * item.quantity : 0
        };
    })
});

// GET /api/cart
router.get('/', auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate({
            path: 'items.product',
            select: 'name brand image variants'
        });

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
            await cart.save();
        }

        res.json(formatCart(cart));
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST /api/cart/add
router.post('/add', auth, async (req, res) => {
    try {
        const { productId, variantId, quantity } = req.body;

        if (!productId || !variantId || !quantity) {
            return res.status(400).json({ success: false, message: 'Product ID, variant ID, and quantity are required' });
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) cart = new Cart({ user: req.user._id, items: [] });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        const variant = product.variants.id(variantId);
        if (!variant) return res.status(404).json({ success: false, message: 'Variant not found' });

        const existingItem = cart.items.find(
            item => item.product.toString() === productId && item.variantId.toString() === variantId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, variantId, quantity });
        }

        await cart.save();
        await cart.populate({ path: 'items.product', select: 'name brand image variants' });

        res.json(formatCart(cart));
    } catch (err) {
        console.error('Error adding to cart:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT /api/cart/items/:itemId - update quantity
router.put('/items/:itemId', auth, async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
        }

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        const item = cart.items.id(itemId);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found in cart' });

        item.quantity = quantity;

        await cart.save();
        await cart.populate({ path: 'items.product', select: 'name brand image variants' });

        res.json(formatCart(cart));
    } catch (err) {
        console.error('Error updating item quantity:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE /api/cart/items/:itemId
router.delete('/items/:itemId', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
        await cart.save();
        await cart.populate({ path: 'items.product', select: 'name brand image variants' });

        res.json(formatCart(cart));
    } catch (err) {
        console.error('Error removing item:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE /api/cart
router.delete('/', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        cart.items = [];
        await cart.save();

        res.json({ success: true, message: 'Cart cleared successfully' });
    } catch (err) {
        console.error('Error clearing cart:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
