const prisma = require('../src/models/index')
const bcrypt = require('bcryptjs')

const hashedPassword = bcrypt.hashSync('123456', 10)

console.log('DB seed starting...')

// User data
const userData = [
  {
    username: 'andycc19', 
    firstName: 'Andy', 
    lastName: 'Codecamp', 
    password: hashedPassword, 
    email: 'andy@ggg.mail',
    phoneNumber: '3333333333',
    age: 28,
    address: '123 Main St, Anytown, USA',
    urlImage: 'https://www.svgrepo.com/show/420364/avatar-male-man.svg',
    role: 'USER'
  },
  {
    username: 'bobbycc19', 
    firstName: 'Bobby', 
    lastName: 'Codecamp', 
    password: hashedPassword, 
    email: 'bobby@ggg.mail',
    phoneNumber: '4444444444',
    age: 34,
    address: '456 Oak Ave, Somewhere, USA',
    urlImage: 'https://www.svgrepo.com/show/420319/actor-chaplin-comedy.svg',
    role: 'USER'
  },
  {
    username: 'candycc19', 
    firstName: 'Candy', 
    lastName: 'Codecamp', 
    password: hashedPassword, 
    email: 'candy@ggg.mail',
    phoneNumber: '5555555555',
    age: 25,
    address: '789 Pine Rd, Nowhere, USA',
    urlImage: 'https://www.svgrepo.com/show/420327/avatar-child-girl.svg',
    role: 'USER'
  },
  {
    username: 'dannycc19', 
    firstName: 'Danny', 
    lastName: 'Codecamp', 
    password: hashedPassword, 
    email: 'danny@ggg.mail',
    phoneNumber: '6666666666',
    age: 31,
    address: '101 Maple Dr, Elsewhere, USA',
    urlImage: 'https://www.svgrepo.com/show/420314/builder-helmet-worker.svg',
    role: 'USER'
  },
  {
    username: 'adminuser', 
    firstName: 'Admin', 
    lastName: 'User', 
    password: hashedPassword, 
    email: 'admin@bookstore.com',
    phoneNumber: '9999999999',
    age: 40,
    address: '999 Admin Blvd, HQ, USA',
    urlImage: 'https://www.svgrepo.com/show/420363/avatar-businessman-male.svg',
    role: 'ADMIN'
  }
]

// Publisher data
const publisherData = [
  {
    name: 'Penguin Random House',
    address: '1745 Broadway, New York, NY 10019',
    contact: 'contact@penguinrandomhouse.com'
  },
  {
    name: 'HarperCollins',
    address: '195 Broadway, New York, NY 10007',
    contact: 'info@harpercollins.com'
  },
  {
    name: 'Simon & Schuster',
    address: '1230 Avenue of the Americas, New York, NY 10020',
    contact: 'customer.service@simonandschuster.com'
  },
  {
    name: 'Macmillan Publishers',
    address: '120 Broadway, New York, NY 10271',
    contact: 'customerservice@macmillan.com'
  }
]

// Book data (will be populated with publisher IDs during seeding)
const bookData = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel about the American Dream set in the Roaring Twenties.',
    stock: 50,
    genre: 'Classic Fiction',
    price: 12.99,
    urlImage: 'https://example.com/images/great-gatsby.jpg'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A story about racial injustice and moral growth in the American South.',
    stock: 45,
    genre: 'Classic Fiction',
    price: 14.99,
    urlImage: 'https://example.com/images/mockingbird.jpg'
  },
  {
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel about totalitarianism and surveillance.',
    stock: 60,
    genre: 'Science Fiction',
    price: 11.99,
    urlImage: 'https://example.com/images/1984.jpg'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A romantic novel about societal expectations and personal growth.',
    stock: 40,
    genre: 'Classic Fiction',
    price: 10.99,
    urlImage: 'https://example.com/images/pride-prejudice.jpg'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'A fantasy adventure about a hobbit who joins a quest to reclaim treasure.',
    stock: 55,
    genre: 'Fantasy',
    price: 15.99,
    urlImage: 'https://example.com/images/hobbit.jpg'
  },
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    description: 'The first book in the Harry Potter series about a young wizard.',
    stock: 70,
    genre: 'Fantasy',
    price: 16.99,
    urlImage: 'https://example.com/images/harry-potter.jpg'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description: 'A novel about teenage alienation and identity.',
    stock: 35,
    genre: 'Coming-of-Age Fiction',
    price: 13.99,
    urlImage: 'https://example.com/images/catcher-rye.jpg'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    description: 'A dystopian novel about a technologically advanced future society.',
    stock: 30,
    genre: 'Science Fiction',
    price: 12.49,
    urlImage: 'https://example.com/images/brave-new-world.jpg'
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    description: 'A novel about the obsessive quest of Captain Ahab for revenge on the white whale.',
    stock: 40,
    genre: 'Classic Fiction',
    price: 13.99,
    urlImage: 'https://example.com/images/moby-dick.jpg'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    description: 'An epic fantasy adventure about the quest to destroy the One Ring.',
    stock: 50,
    genre: 'Fantasy',
    price: 19.99,
    urlImage: 'https://example.com/images/lotr.jpg'
  },
  {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    description: 'A psychological novel exploring guilt and redemption.',
    stock: 35,
    genre: 'Classic Fiction',
    price: 14.49,
    urlImage: 'https://example.com/images/crime-punishment.jpg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description: 'A novel about following one’s dreams and destiny.',
    stock: 60,
    genre: 'Philosophical Fiction',
    price: 12.99,
    urlImage: 'https://example.com/images/alchemist.jpg'
  },
  {
    title: 'The Catch-22',
    author: 'Joseph Heller',
    description: 'A satirical novel about the absurdities of war.',
    stock: 45,
    genre: 'Satire',
    price: 15.99,
    urlImage: 'https://example.com/images/catch-22.jpg'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    description: 'A gothic novel of passion and revenge.',
    stock: 38,
    genre: 'Classic Fiction',
    price: 11.99,
    urlImage: 'https://example.com/images/wuthering-heights.jpg'
  },
  {
    title: 'The Road',
    author: 'Cormac McCarthy',
    description: 'A post-apocalyptic novel about survival and father-son bonds.',
    stock: 25,
    genre: 'Dystopian Fiction',
    price: 13.49,
    urlImage: 'https://example.com/images/the-road.jpg'
  },
  {
    title: 'Frankenstein',
    author: 'Mary Shelley',
    description: 'A novel about a scientist who creates a living being with disastrous consequences.',
    stock: 40,
    genre: 'Gothic Fiction',
    price: 10.99,
    urlImage: 'https://example.com/images/frankenstein.jpg'
  },
  {
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel García Márquez',
    description: 'A magical realism novel about the multi-generational story of the Buendía family.',
    stock: 30,
    genre: 'Magical Realism',
    price: 16.99,
    urlImage: 'https://example.com/images/one-hundred-years.jpg'
  },
  {
    title: 'The Brothers Karamazov',
    author: 'Fyodor Dostoevsky',
    description: 'A novel exploring faith, doubt, and morality.',
    stock: 28,
    genre: 'Philosophical Fiction',
    price: 17.49,
    urlImage: 'https://example.com/images/brothers-karamazov.jpg'
  }
]

async function seedDB() {
  try {
    // Create users
    console.log('Seeding users...')
    await prisma.user.createMany({ data: userData })
    
    // Create publishers
    console.log('Seeding publishers...')
    await prisma.publisher.createMany({ data: publisherData })
    
    // Get publishers to assign IDs to books
    const publishers = await prisma.publisher.findMany()
    
    // Create books with publisher IDs
    console.log('Seeding books...')
    const booksWithPublishers = bookData.map((book, index) => {
      return {
        ...book,
        publisherId: publishers[index % publishers.length].id
      }
    })
    await prisma.book.createMany({ data: booksWithPublishers })
    
    // Get users and books for creating carts and orders
    const users = await prisma.user.findMany()
    const books = await prisma.book.findMany()
    
    // Create carts for each user
    console.log('Seeding carts...')
    for (const user of users) {
      const cart = await prisma.cart.create({
        data: {
          userId: user.id
        }
      })
      
      // Add 1-3 random books to each cart
      const numItems = Math.floor(Math.random() * 3) + 1
      const cartItems = []
      
      for (let i = 0; i < numItems; i++) {
        const randomBook = books[Math.floor(Math.random() * books.length)]
        const quantity = Math.floor(Math.random() * 3) + 1
        
        cartItems.push({
          cartId: cart.id,
          bookId: randomBook.id,
          quantity: quantity
        })
      }
      
      await prisma.cartItem.createMany({
        data: cartItems
      })
    }
    
    // Create orders for each user
    console.log('Seeding orders...')
    for (const user of users) {
      // Create 1-2 orders per user
      const numOrders = Math.floor(Math.random() * 2) + 1
      
      for (let i = 0; i < numOrders; i++) {
        // Random date in the past year
        const orderDate = new Date()
        orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 365))
        
        const order = await prisma.order.create({
          data: {
            userId: user.id,
            orderDate: orderDate,
            status: ['Pending', 'Shipped', 'Delivered'][Math.floor(Math.random() * 3)]
          }
        })
        
        // Add 1-4 random books to each order
        const numItems = Math.floor(Math.random() * 4) + 1
        const orderItems = []
        
        for (let j = 0; j < numItems; j++) {
          const randomBook = books[Math.floor(Math.random() * books.length)]
          const quantity = Math.floor(Math.random() * 3) + 1
          
          orderItems.push({
            orderId: order.id,
            bookId: randomBook.id,
            quantity: quantity,
            price: randomBook.price
          })
        }
        
        await prisma.orderItem.createMany({
          data: orderItems
        })
      }
    }
    
    console.log('Database seeding completed successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedDB()

// Run with: npx prisma db seed