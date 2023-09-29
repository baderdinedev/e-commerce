// server/controllers/productController.js
const Product = require('../models/products');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    const newProduct = new Product({
      title,
      description,
      price,
      imageUrl,
    });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// server/controllers/productController.js

// Retrieve all products
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// server/controllers/productController.js

// Retrieve a single product by ID
exports.getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
    
// server/controllers/productController.js

// Update a product by ID
exports.updateProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const updates = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(updatedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// server/controllers/productController.js

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await Product.findByIdAndRemove(productId);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(deletedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

// server/controllers/productController.js

// Filter products by price range
exports.getProductsByPriceRange = async (req, res) => {
    try {
      const { minPrice, maxPrice } = req.query;
  
      if (!minPrice || !maxPrice) {
        return res.status(400).json({ error: 'Both minPrice and maxPrice are required' });
      }
  
      const products = await Product.find({
        price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) },
      });
  
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  