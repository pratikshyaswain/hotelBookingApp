const Contact = require("../models/contact-model");
const contactForm = async (req, res, next) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ message: "Message send successfully!" });
  } catch (error) {
    // res.status(500).json({ msg: "message not delivered!" });
    next(error);
  }
};
module.exports = contactForm;
