const express = require("express");
const adminController = require("../controllers/admin-controller");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/admin-middleware");
router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUser);
// delete users
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

// update users

router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserById);

// get single userdata
router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getSingleUserData);

// all hotels
router
  .route("/hotels")
  .get(authMiddleware, adminMiddleware, adminController.getAllHotels);

//  delete hotels
router
  .route("/hotels/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteHotelById);

// get all bookings

router
  .route("/bookings")
  .get(authMiddleware, adminMiddleware, adminController.getAllBookings);

module.exports = router;
