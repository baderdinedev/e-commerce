// server/routes/products.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAdmin } = require('../middleware/authMiddleware'); // Import the isAdmin middleware

// Create a new product
router.post('/', isAdmin, productController.createProduct);

// Retrieve all products
router.get('/', productController.getAllProducts);

// Retrieve a single product by ID
router.get('/:id', productController.getProductById);

// Update a product by ID
router.put('/:id',isAdmin, productController.updateProductById);

// Delete a product by ID
router.delete('/:id',isAdmin, productController.deleteProductById);

// Filter products by price range
router.get('/filter', productController.getProductsByPriceRange);

module.exports = router;
