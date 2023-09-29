const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config/db');
const expressSession = require('express-session'); // Import express-session

const usersRouter = require('./routes/users'); // Import the users router
const productsRouter = require('./routes/products'); // Import the products router
const orderRouter = require('./routes/order')
const cartRouter = require('./routes/cart')
const app = express();

app.use(expressSession({
    secret: 'yKAZD55DAZQSDQ', // Replace with a strong, random secret
    resave: false,
    saveUninitialized: false,
  }));
// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));


const PORT = process.env.PORT || 5000;
app.use('/api/users', usersRouter); // Use the users router for user-related routes
app.use('/api/products', productsRouter); // Use the products router for product-related routes
app.use('/api/orders',orderRouter)
app.use('/api/cart',cartRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

  
  
  

