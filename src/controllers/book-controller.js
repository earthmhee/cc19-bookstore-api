// src/controllers/book-controller.js
const prisma = require("../models");
const createError = require("../utils/createError");
const tryCatch = require("../utils/tryCatch");

exports.createBook = tryCatch(async (req, res, next) => {
  const { title, author, description, stock, genre, price, publisherId } =
    req.body;
  const urlImage = req.file?.path; // Assuming we'll use multer for image upload

  const book = await prisma.book.create({
    data: {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      stock: parseInt(req.body.stock),
      genre: req.body.genre,
      price: parseFloat(req.body.price),
      publisherId: req.body.publisherId ? parseInt(req.body.publisherId) : 1, // Default to 1 if not provided
      urlImage: req.file?.path || null, // Handle the image upload
    },
  });

  res.status(201).json({ message: "Book created successfully", book });
});

exports.updateBook = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const bookExists = await prisma.book.findUnique({
    where: { id: parseInt(id) },
  });

  if (!bookExists) {
    return next(createError("Book not found", 404));
  }

  const { title, author, description, stock, genre, price, publisherId } =
    req.body;
  const urlImage = req.file?.path;

  const book = await prisma.book.update({
    where: { id: parseInt(id) },
    data: {
      ...(title && { title }),
      ...(author && { author }),
      ...(description && { description }),
      ...(stock && { stock: parseInt(stock) }),
      ...(genre && { genre }),
      ...(price && { price: parseFloat(price) }),
      ...(publisherId && { publisherId: parseInt(publisherId) }),
      ...(urlImage && { urlImage }),
    },
  });

  res.json({ message: "Book updated successfully", book });
});

exports.adjustStock = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { stock } = req.body;

  const book = await prisma.book.update({
    where: { id: parseInt(id) },
    data: { stock: parseInt(stock) },
  });

  res.json({ message: "Stock updated successfully", book });
});

// Add receipt handling functionality
exports.updateOrderStatus = tryCatch(async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const orderExists = await prisma.order.findUnique({
    where: { id: parseInt(orderId) },
  });

  if (!orderExists) {
    return next(createError("Order not found", 404));
  }

  const order = await prisma.order.update({
    where: { id: parseInt(orderId) },
    data: { status },
    include: {
      user: {
        select: {
          email: true,
          username: true,
        },
      },
      OrderItems: {
        include: {
          book: true,
        },
      },
    },
  });

  res.json({ message: "Order status updated successfully", order });
});

exports.getAllOrders = tryCatch(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          email: true,
          username: true,
        },
      },
      OrderItems: {
        include: {
          book: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: parseInt(skip),
    take: parseInt(limit),
  });

  const totalOrders = await prisma.order.count();

  res.json({
    orders,
    pagination: {
      total: totalOrders,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(totalOrders / limit),
    },
  });
});
