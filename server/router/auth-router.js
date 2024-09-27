const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const { signUpSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/").get(authControllers.home);

router
  .route("/register")
  .post(validate(signUpSchema), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);
// update

router.route("/user/update/:id").patch(authControllers.update);
module.exports = router;
