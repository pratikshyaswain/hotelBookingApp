require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const connectDb = require("./utilis/db");
const errorMiddleware = require("./middleware/error-middleware");
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const bookingRouter = require("./router/booking-router");
const hotelRouter = require("./router/hotels-router");
const checkDateHotel = require("./router/checkDate-hotel-router");

// admin router
const adminRouter = require("./router/admin-router");

const PORT = 5000;

// CORS options
const corsOptions = {
  origin: "http://localhost:3000", // The allowed origin
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "HEAD"], // Methods allowed
  credentials: true, // Allow credentials (cookies, authorization headers)
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route handlers
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/form", bookingRouter);
app.use("/api/data", hotelRouter);
// hotel by date

app.use("/api/date", checkDateHotel);

// admin
app.use("/api/admin", adminRouter);

// Error handling middleware
app.use(errorMiddleware);

// Connect to DB and start server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
