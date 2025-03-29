const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book-controller');
const authenticate = require('../middlewares/authenticate');
const createError = require('../utils/createError'); // Add this line if not already imported
const upload = require('../middlewares/upload');

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return next(createError('Unauthorized access', 403));
    }
    next();
  } catch (err) {
    next(err);
  }
};

// Book management routes
router.post('/books', authenticate, isAdmin, upload.single('image'), bookController.createBook);
router.patch('/books/:id', authenticate, isAdmin, upload.single('image'), bookController.updateBook);
router.patch('/books/:id/stock', authenticate, isAdmin, bookController.adjustStock);

// Order management routes
router.get('/orders', authenticate, isAdmin, bookController.getAllOrders);
router.patch('/orders/:orderId/status', authenticate, isAdmin, bookController.updateOrderStatus);

module.exports = router;