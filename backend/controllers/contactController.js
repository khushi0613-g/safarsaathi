const Contact = require('../models/contact');

// @route  POST /api/contact
// @access Public
const sendMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: 'Message received! We will get back to you soon.',
      contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage };