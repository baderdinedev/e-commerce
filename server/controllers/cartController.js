// Add a product to the cart
exports.addToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id; // Assuming you have authentication and can get the user's ID from the request
  
      // Find the user's cart or create one if it doesn't exist
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }
  
      // Check if the product already exists in the cart
      const existingItem = cart.items.find((item) => item.product.toString() === productId);
  
      if (existingItem) {
        // Update the quantity if the product exists
        existingItem.quantity += quantity;
      } else {
        // Add a new cart item if the product doesn't exist
        cart.items.push({ product: productId, quantity });
      }
  
      // Calculate the total price
      cart.total = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
  
      // Save the cart
      await cart.save();
  
      res.status(201).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding the product to the cart.' });
    }
  };

  // Update cart item quantity
exports.updateCartItemQuantity = async (req, res) => {
    try {
      const { itemId } = req.params;
      const { quantity } = req.body;
  
      // Find the user's cart
      const userId = req.user.id;
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Find and update the cart item's quantity
      const cartItem = cart.items.find((item) => item._id.toString() === itemId);
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
  
      cartItem.quantity = quantity;
  
      // Recalculate the total price
      cart.total = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the cart item quantity.' });
    }
  };

  // Calculate cart total
exports.calculateCartTotal = async (req, res) => {
    try {
      const userId = req.user.id;
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      res.status(200).json({ total: cart.total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while calculating the cart total.' });
    }
  };
  