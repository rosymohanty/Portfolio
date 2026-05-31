const nodemailer = require("nodemailer");
const Contact = require("../models/contactModel");

const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, message) are required"
      });
    }

    // ✅ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    // ✅ Save to database
    await Contact.create({ name, email, message });

    // ✅ Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (error) {
    console.error("Contact error:", error);
    
    // ✅ Send more specific error message
    let errorMessage = "Failed to send message. Please try again.";
    if (error.code === 'EAUTH') {
      errorMessage = "Email service configuration error. Please contact support.";
    } else if (error.name === 'ValidationError') {
      errorMessage = Object.values(error.errors).map(e => e.message).join(', ');
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

module.exports = { sendMessage };