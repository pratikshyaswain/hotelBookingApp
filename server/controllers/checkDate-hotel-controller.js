const Hotel = require("../models/hotels-model");

// Function to parse date from dd-mm-yyyy format to Date object
const parseDate = (dateStr) => {
  if (!dateStr) {
    throw new Error("Date string is required");
  }

  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date
};

const checkDateHotel = async (req, res, next) => {
  try {
    // Ensure that both dates are provided
    if (!req.body.checkInDate || !req.body.checkOutDate) {
      return res.status(400).json({ message: "Both dates are required" });
    }

    const checkInDate = parseDate(req.body.checkInDate); // Convert to Date object
    const checkOutDate = parseDate(req.body.checkOutDate); // Convert to Date object

    // Validation: Check that check-in date is earlier than check-out date
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        message: "Check-out date must be after Check-in date ",
      });
    }

    // Find hotels where there is no overlap with requested dates
    const hotels = await Hotel.find({
      $or: [
        { checkOutDate: { $lte: checkInDate } }, // Hotel checks out on or before requested check-in
        { checkIndate: { $gte: checkOutDate } }, // Hotel checks in on or after requested check-out
      ],
    });

    if (hotels.length > 0) {
      return res.status(200).json(hotels);
    }

    return res
      .status(400)
      .json({ message: "No hotels available for the selected dates" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = checkDateHotel;
