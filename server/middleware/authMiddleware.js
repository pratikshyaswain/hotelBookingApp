const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(400).json({ msg: "Token not provided" });
  }
  // console.log("middleware", token);

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("middleware", jwtToken);
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_TOKEN);
    console.log(isVerified);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    // console.log(userData);
    req.user = userData;
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (error) {
    return res.status(400).json({ msg: "Token not provided" });
  }
};
module.exports = authMiddleware;
