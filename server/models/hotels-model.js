const { Schema, model } = require("mongoose");
const hotelSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  availableRooms: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  checkIndate: { type: String, required: true },
  checkOutDate: { type: String, required: true },
});
const Hotel = new model("Hotel", hotelSchema);
module.exports = Hotel;
