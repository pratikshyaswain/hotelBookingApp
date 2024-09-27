const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
// const authMiddleware = require("../middleware/authMiddleware");
// home logic

const home = async (req, res) => {
  try {
    return res.status(200).send("wlcome to server using router");
  } catch (error) {
    console.log("Error from home", error);
  }
};

// register logic

const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, email, phone, address, state, city, pin, password } =
      req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exist!" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      address,
      state,
      city,
      pin,
      password,
    });

    return res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // res.status(500).json("Internal server error");
    next(error);
  }
};

// login logic
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    // console.log(userExist);
    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = await bcrypt.compare(password, userExist.password);
    if (user) {
      return res.status(200).json({
        msg: "login successfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    // res.status(500).json("internal server error");
    next(error);
  }
};

// userdata logic

const user = async (req, res, next) => {
  try {
    // res.json({ msg: "hii" });
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    next(error);
  }
};

// update

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const userUpdate = await User.updateOne(
      { _id: id },
      {
        $set: data,
      }
    );
    return res
      .status(200)
      .json({ message: "Data updated successfully!", userUpdate });
  } catch (error) {
    next(error);
  }
};
module.exports = { home, register, login, user, update };
