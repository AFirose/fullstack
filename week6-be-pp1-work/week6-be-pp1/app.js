// app.js
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config(); // Optional, for environment variables
const connectDB = require("./config/db");

// Import custom middleware
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
// Import routers
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");


const app = express();

connectDB();


// ----------------------
// MIDDLEWARE
// ----------------------
app.use(morgan("dev"));       // Logging
app.use(express.json());      // Parse JSON

// ----------------------
// ROUTES
// ----------------------
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);

// ----------------------
// ERROR HANDLING
// ----------------------
app.use(unknownEndpoint);
app.use(errorHandler);


// ----------------------
// START SERVER
// ----------------------
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
