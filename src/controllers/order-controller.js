// src/controllers/order-controller.js
const prisma = require("../models");
const createError = require("../utils/createError");
const tryCatch = require("../utils/tryCatch");

exports.createOrder = tryCatch(async (req, res, next) => {
  const userId = req.user.id;
  
  // Parse items if they're sent as a JSON string
  let items;
  if (typeof req.body.items === 'string') {
    try {
      items = JSON.parse(req.body.items);
    } catch (error) {
      return next(createError(400, "Invalid items format"));
    }
  } else {
    items = req.body.items || [];
  }
  
  // Ensure items is an array
  if (!Array.isArray(items)) {
    return next(createError(400, "Items must be an array"));
  }
  
  // Check if receipt was uploaded
  const receiptUrl = req.file?.path;
  if (!receiptUrl) {
    return next(createError(400, "Payment receipt is required"));
  }

  // Create the order
  const order = await prisma.order.create({
    data: {
      userId,
      orderDate: new Date(),
      status: "PENDING", // Initial status
      receiptUrl,
      // Add shipping info if needed
      // shippingAddress: req.body.shippingAddress,
      // shippingCity: req.body.shippingCity,
      // etc.
    }
  });

  // Create order items
  const orderItems = items.map(item => ({
    orderId: order.id,
    bookId: parseInt(item.bookId),
    quantity: parseInt(item.quantity),
    price: parseFloat(item.price)
  }));

  await prisma.orderItem.createMany({
    data: orderItems
  });

  // Get the complete order with items
  const completeOrder = await prisma.order.findUnique({
    where: { id: order.id },
    include: {
      OrderItems: {
        include: {
          book: true
        }
      }
    }
  });

  res.status(201).json({ 
    message: "Order created successfully", 
    orderId: order.id,
    order: completeOrder 
  });
});

exports.getUserOrders = tryCatch(async (req, res, next) => {
  const userId = req.user.id;
  
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      OrderItems: {
        include: {
          book: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.json({ orders });
});

exports.getOrderById = tryCatch(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  
  const order = await prisma.order.findUnique({
    where: { 
      id: parseInt(id),
      userId // Ensure the order belongs to the user
    },
    include: {
      OrderItems: {
        include: {
          book: true
        }
      }
    }
  });

  if (!order) {
    return next(createError(404, "Order not found"));
  }

  res.json({ order });
});

module.exports = exports;