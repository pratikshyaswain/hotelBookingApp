const express = require("express");
const router = express.Router();
const {
  bookingForm,
  allBookings,
  deleteBookingById,
} = require("../controllers/booking-controller");
const { bookingValidationSchema } = require("../validators/auth-validator");
const validate = require("../middleware/validate-middleware");

// book hotel
router.route("/booking").post(validate(bookingValidationSchema), bookingForm);

// get all bookings

router.route("/allBookings").get(allBookings);

// delete booking
router.route("/delete/:id").delete(deleteBookingById);

// router.route("/register").get((req, res) => {
// });
module.exports = router;
