const Booking = require("../models/booking-model");

const bookingForm = async (req, res, next) => {
  try {
    const bookingData = req.body;
    await Booking.create(bookingData);
    return res.status(200).json({ message: "Booking confirmed!" });
  } catch (error) {
    next(error);
  }
};

// get all bookings

const allBookings = async (req, res, next) => {
  try {
    const { email } = req.query;
    const bookings = await Booking.find({ email: email });
    if (bookings.length > 0) {
      return res.status(200).json(bookings);
    }
    return res.status(404).json({ message: "No booking found" });
  } catch (error) {
    next(error);
  }
};
// delete booking

const deleteBookingById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const email = req.body.email;
    const deleteBooking = await Booking.findOne({ _id: id, email: email });
    await deleteBooking.deleteOne();
    return res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
module.exports = { bookingForm, allBookings, deleteBookingById };
