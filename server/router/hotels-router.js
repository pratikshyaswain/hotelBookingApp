const express = require("express");
const router = express.Router();
const {
  hotelForm,
  upload,
  getHotels,
} = require("../controllers/hotels-controller");

// Use Multer's upload middleware to handle image file upload
router.route("/hotels").post(upload.single("image"), hotelForm);
// get hotel
router.route("/hotels").get(getHotels);

module.exports = router;
