// src/routes/order-route.js
const express = require('express');
const orderRoute = express.Router();
const orderController = require('../controllers/order-controller');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

// Create a new order
orderRoute.post('/orders', 
  authenticate, 
  upload.single('receipt'), 
  orderController.createOrder
);

// Get all orders for the logged-in user
orderRoute.get('/orders', 
  authenticate, 
  orderController.getUserOrders
);

// Get a specific order by ID
orderRoute.get('/orders/:id', 
  authenticate, 
  orderController.getOrderById
);

module.exports = orderRoute;