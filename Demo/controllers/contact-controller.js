const Contact = require("../models/contact-model");

const contactForm = async (req, res, next) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ message: "message send successfully" });
  } catch (error) {
    error.message = "message not delivered";
    next(error);
  }
};

module.exports = contactForm;
