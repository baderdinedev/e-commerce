// server/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add a product to the cart
router.post('/add', cartController.addToCart);

// Update cart item quantity
router.put('/update/:itemId', cartController.updateCartItemQuantity);

// Calculate cart total
router.get('/total', cartController.calculateCartTotal);

module.exports = router;
