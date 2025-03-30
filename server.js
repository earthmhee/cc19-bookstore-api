require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const authRoute = require("./src/routes/auth-route");
const errorMiddleware = require("./src/middlewares/errorMiddleware");
const notFound = require("./src/middlewares/notFound");
const userRoute = require("./src/routes/user-route");
const bookRoute = require("./src/routes/book-route");
const adminRoute = require('./src/routes/admin-route');
const orderRoute = require("./src/routes/order-route");
// Middleware
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(helmet())
app.use(cors())
app.use(express.json());

//api
app.use('/auth', authRoute)
app.use('/auth', userRoute)
app.use('/auth', bookRoute)
app.use('/auth', orderRoute)
app.use('/admin', bookRoute)
app.use('/admin', adminRoute);

// error Middleware
app.use(errorMiddleware)

// notFound
app.use(notFound)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
