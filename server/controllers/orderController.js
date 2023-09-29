const Order = require('../models/order');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
      const { user, products, totalPrice } = req.body;
      const order = new Order({ user, products, totalPrice });
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the order.' });
    }
};
// Get orders for a specific user
exports.getOrdersByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({ user: userId });
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
  };

// Filter orders by date range
exports.getOrdersByDateRange = async (req, res) => {
    try {
      const startDate = new Date(req.query.startDate); // Start date as a query parameter
      const endDate = new Date(req.query.endDate); // End date as a query parameter
      
      // Find orders between the start and end dates
      const orders = await Order.find({
        createdAt: { $gte: startDate, $lte: endDate },
      });
  
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching orders by date range.' });
    }
  };

// Filter orders by status
exports.getOrdersByStatus = async (req, res) => {
    try {
      const status = req.query.status; // Status as a query parameter
      
      // Find orders with the specified status
      const orders = await Order.find({ status });
  
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching orders by status.' });
    }
  };
  

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const newStatus = req.body.status; // Assuming you send the new status in the request body
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status: newStatus },
        { new: true }
      );
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating order status.' });
    }
  };
  


// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the order.' });
    }
  };
  

  
  // Delete an order
exports.deleteOrder = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findByIdAndRemove(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(204).send(); // Successful deletion with no content
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the order.' });
    }
};
  
