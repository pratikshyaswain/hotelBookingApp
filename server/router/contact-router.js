const express = require("express");
const router = express.Router();
const contactForm = require("../controllers/contact-controller");
router.route("/contact").post(contactForm);

// router.route("/register").get((req, res) => {
// });
module.exports = router;
