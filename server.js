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
// Middleware
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(helmet())
app.use(cors())
app.use(express.json());

//api
app.use('/auth', authRoute)
app.use('/auth', userRoute)

// error Middleware
app.use(errorMiddleware)

// notFound
app.use(notFound)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
