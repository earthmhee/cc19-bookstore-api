// // src/services/bookService.js
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// /**
//  * Get all books with optional filtering, sorting, and pagination
//  */
// export const getAllBooks = async ({
//   page = 1,
//   limit = 10,
//   category = null,
//   search = '',
//   sortBy = 'title',
//   sortOrder = 'asc'
// }) => {
//   const skip = (page - 1) * limit;
  
//   // Build filter conditions
//   const where = {};
  
//   // Add category filter if provided
//   if (category && category !== 'All') {
//     where.category = category;
//   }
  
//   // Add search filter if provided
//   if (search) {
//     where.OR = [
//       { title: { contains: search, mode: 'insensitive' } },
//       { author: { contains: search, mode: 'insensitive' } },
//       { description: { contains: search, mode: 'insensitive' } }
//     ];
//   }
  
//   // Get total count for pagination
//   const totalCount = await prisma.book.count({ where });
  
//   // Get books with publisher information
//   const books = await prisma.book.findMany({
//     where,
//     include: {
//       publisher: {
//         select: {
//           name: true,
//           id: true
//         }
//       }
//     },
//     orderBy: {
//       [sortBy]: sortOrder
//     },
//     skip,
//     take: limit
//   });
  
//   return {
//     books,
//     pagination: {
//       total: totalCount,
//       page,
//       limit,
//       pages: Math.ceil(totalCount / limit)
//     }
//   };
// };

// /**
//  * Get a single book by ID with publisher information
//  */
// export const getBookById = async (id) => {
//   return prisma.book.findUnique({
//     where: { id },
//     include: {
//       publisher: {
//         select: {
//           name: true,
//           id: true
//         }
//       }
//     }
//   });
// };

// /**
//  * Get featured books (newest or bestsellers)
//  */
// export const getFeaturedBooks = async (limit = 4) => {
//   return prisma.book.findMany({
//     where: {
//       featured: true
//     },
//     include: {
//       publisher: {
//         select: {
//           name: true
//         }
//       }
//     },
//     take: limit
//   });
// };

// /**
//  * Get books by category
//  */
// export const getBooksByCategory = async (category, limit = 8) => {
//   return prisma.book.findMany({
//     where: {
//       category
//     },
//     include: {
//       publisher: {
//         select: {
//           name: true
//         }
//       }
//     },
//     take: limit
//   });
// };

// /**
//  * Search books by title, author, or description
//  */
// export const searchBooks = async (query, limit = 10) => {
//   return prisma.book.findMany({
//     where: {
//       OR: [
//         { title: { contains: query, mode: 'insensitive' } },
//         { author: { contains: query, mode: 'insensitive' } },
//         { description: { contains: query, mode: 'insensitive' } }
//       ]
//     },
//     include: {
//       publisher: {
//         select: {
//           name: true
//         }
//       }
//     },
//     take: limit
//   });
// };

// /**
//  * Get all available book categories
//  */
// export const getBookCategories = async () => {
//   const books = await prisma.book.findMany({
//     select: {
//       category: true
//     },
//     distinct: ['category']
//   });
  
//   return books.map(book => book.category);
// };

// export default {
//   getAllBooks,
//   getBookById,
//   getFeaturedBooks,
//   getBooksByCategory,
//   searchBooks,
//   getBookCategories
// };

const mockBooks = [
    {
      id: 1,
      title: "Thunderstrike",
      author: "John Smith",
      price: 19.99,
      stock: 15,
      rating: 4.5,
      description: "An epic tale of adventure and discovery in a world where magic and technology collide. Follow the journey of a young hero as they navigate through dangerous territories and uncover ancient secrets.",
      category: "Novel",
      isbn: "978-1234567890",
      pages: 342,
      publishDate: new Date("2023-05-15"),
      publisher: { name: "8 Lines Publishing" },
      coverImage: "/images/books/1.jpg"
    },
    {
      id: 2,
      title: "Shadowhunters",
      author: "Jane Doe",
      price: 24.99,
      stock: 8,
      rating: 4.2,
      description: "In a world hidden from ordinary humans, shadowhunters battle demons and protect the innocent. When a young girl discovers her heritage, she must learn to navigate this dangerous new reality.",
      category: "Novel",
      isbn: "978-0987654321",
      pages: 416,
      publishDate: new Date("2022-11-30"),
      publisher: { name: "8 Lines Publishing" },
      coverImage: "/images/books/2.jpg"
    },
    {
      id: 3,
      title: "Mystical Professions",
      author: "Robert Johnson",
      price: 15.99,
      stock: 12,
      rating: 3.8,
      description: "A comprehensive guide to the mystical professions of the ancient world. Learn about alchemists, seers, and healers who shaped history with their extraordinary abilities.",
      category: "Translations",
      isbn: "978-5678901234",
      pages: 278,
      publishDate: new Date("2023-02-10"),
      publisher: { name: "8 Lines Publishing" },
      coverImage: "/images/books/3.jpg"
    },
    {
      id: 4,
      title: "The Book Thief",
      author: "Markus Zusak",
      price: 12.99,
      stock: 20,
      rating: 4.7,
      description: "Set during World War II in Germany, this novel tells the story of Liesel, a young girl who finds solace in books and words during one of history's darkest periods.",
      category: "Novel",
      isbn: "978-3456789012",
      pages: 552,
      publishDate: new Date("2021-08-22"),
      publisher: { name: "8 Lines Publishing" },
      coverImage: "/images/books/4.jpg"
    }
  ];
  
  // Duplicate books for the grid
  const allMockBooks = [
    ...mockBooks,
    ...mockBooks.map(book => ({ ...book, id: book.id + 4 }))
  ];
  
  // Get all books with optional filtering
  export const getAllBooks = async (params = {}) => {
    const {
      page = 1,
      limit = 10,
      category = null,
      search = '',
      sortBy = 'title',
      sortOrder = 'asc'
    } = params;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter books
    let filteredBooks = [...allMockBooks];
    
    if (category && category !== 'All') {
      filteredBooks = filteredBooks.filter(book => book.category === category);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort books
    filteredBooks.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      
      if (typeof valueA === 'string') {
        return sortOrder === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });
    
    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
    
    return {
      books: paginatedBooks,
      pagination: {
        total: filteredBooks.length,
        page,
        limit,
        pages: Math.ceil(filteredBooks.length / limit)
      }
    };
  };
  
  // Get a single book by ID
  export const getBookById = async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const book = mockBooks.find(book => book.id === parseInt(id));
    
    if (!book) {
      throw new Error('Book not found');
    }
    
    return book;
  };
  
  export default {
    getAllBooks,
    getBookById
  };