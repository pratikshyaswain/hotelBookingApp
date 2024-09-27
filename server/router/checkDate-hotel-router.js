const express = require("express");
const router = express.Router();
const checkDateHotel = require("../controllers/checkDate-hotel-controller");
// get hotel by date

router.route("/hotel").post(checkDateHotel);

module.exports = router;
