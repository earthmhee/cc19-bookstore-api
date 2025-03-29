// src/routes/book-route.js
const express = require('express');
const bookRoute = express.Router();
const prisma = require('../models');

bookRoute.get('/books', async (req, res) => {
    const { page = 1, limit = 10, genre, search, sortBy = 'title', sortOrder = 'asc' } = req.query;
    const skip = (page - 1) * parseInt(limit);
  
    try {
      const where = {};
      if (genre && genre !== 'All') {
        where.genre = genre;
      }
      if (search) {
        where.OR = [
          { title: { contains: search } },
          { author: { contains: search } },
          { description: { contains: search } },
        ];
      }
  
      const totalCount = await prisma.book.count({ where });
      const books = await prisma.book.findMany({
        where,
        include: {
          publisher: {
            select: {
              name: true,
              id: true,
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: parseInt(limit),
      });
  
      res.json({
        books,
        pagination: {
          total: totalCount,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(totalCount / limit),
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

bookRoute.get('/books/:id', async (req, res) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        publisher: {
          select: {
            name: true,
            id: true
          }
        }
      }
    });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

bookRoute.get('/books/genres', async (req, res) => {
  try {
    const genres = await prisma.book.findMany({
      select: {
        genre: true
      },
      distinct: ['genre']
    });
    res.json(genres.map(g => g.genre));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = bookRoute;