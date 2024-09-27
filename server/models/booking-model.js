const mongoose = require("mongoose");

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: String,
    required: true,
  },
  checkOutDate: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  hotelName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  rooms: {
    type: String,
    required: true,
    trim: true,
  },
  isBooked: {
    type: String,
    default: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to check if the booking dates are valid
// const convertToISODate = (dateString) => {
//   const [day, month, year] = dateString.split("/").map(Number);
//   return new Date(year, month - 1, day).toISOString().slice(0, 10);
// };

// bookingSchema.pre("save", function (next) {
//   const checkInDateISO = convertToISODate(this.checkInDate);
//   const checkOutDateISO = convertToISODate(this.checkOutDate);
//   if (checkOutDateISO <= checkInDateISO) {
//     return next(new Error("Check-out date must be after check-in date"));
//   }
//   next();
// });

module.exports = mongoose.model("Booking", bookingSchema);
