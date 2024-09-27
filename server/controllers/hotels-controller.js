const Hotel = require("../models/hotels-model");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const hotelForm = async (req, res, next) => {
  try {
    const {
      name,
      location,
      availableRooms,
      price,
      description,
      checkIndate,
      checkOutDate,
    } = req.body;
    const imagePath = req.file ? req.file.path : null;
    const response = await Hotel.create({
      name,
      location,
      availableRooms,
      price,
      description,
      checkIndate,
      checkOutDate,
      image: imagePath,
    });
    // console.log(response);
    return res.status(200).json({
      message: "File uploaded successfully!",
      data: response,
    });
  } catch (error) {
    // res.status(500).json({ msg: "message not delivered!" });
    next(error);
  }
};

// get hotels

const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    return res.status(200).json({
      message: "Hotels retrieved successfully!",
      data: hotels,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { hotelForm, upload, getHotels };
