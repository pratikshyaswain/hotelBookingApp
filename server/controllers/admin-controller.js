const User = require("../models/user-model");
const Hotels = require("../models/hotels-model");
const Booking = require("../models/booking-model");
// all users
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// all hotels

const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotels.find();
    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ message: "No hotels found!" });
    }
    return res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
// delete hotel
const deleteHotelById = async (req, res) => {
  try {
    const id = req.params.id;
    await Hotels.deleteOne({ _id: id });
    return res.status(200).json({ message: "Hotel deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

//delete users

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
// update user

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updateUser = await User.updateOne(
      { _id: id },
      {
        $set: data,
      }
    );
    return res
      .status(200)
      .json({ message: "User updated successfully!", updateUser });
  } catch (error) {
    next(error);
  }
};

// get single data

const getSingleUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const usersData = await User.findOne({ _id: id });
    return res.status(200).json(usersData);
  } catch (error) {
    next(error);
  }
};

// get all bookings

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found!" });
    }
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUser,
  getAllHotels,
  deleteUserById,
  updateUserById,
  getSingleUserData,
  getAllBookings,
  deleteHotelById,
};
