// server/routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAdmin } = require('../middleware/authMiddleware'); // Import the isAdmin middleware

// Create a new order
router.post('/', orderController.createOrder);

// Get orders for a specific user
router.get('/user/:userId', orderController.getOrdersByUser);

// Update order status
router.put('/:orderId',isAdmin, orderController.updateOrderStatus);

// Get order by ID
router.get('/:orderId', orderController.getOrderById);

// Delete an order
router.delete('/:orderId',isAdmin, orderController.deleteOrder);

// Filter orders by date range
router.get('/filter-by-date', orderController.getOrdersByDateRange);

// Filter orders by status
router.get('/filter-by-status', orderController.getOrdersByStatus);

// ...

module.exports = router;
