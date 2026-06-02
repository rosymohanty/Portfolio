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

    // ✅ Improved email configuration for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s/g, ''), // Remove any spaces
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // ✅ Verify transporter configuration
    await transporter.verify();

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h3>New Portfolio Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from your portfolio contact form</small></p>
      `,
      text: `
        New Portfolio Contact Message
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (error) {
    console.error("Contact error details:", {
      message: error.message,
      code: error.code,
      command: error.command
    });
    
    // ✅ Send more specific error message
    let errorMessage = "Failed to send message. Please try again.";
    
    if (error.code === 'EAUTH') {
      errorMessage = "Email authentication failed. Please check email credentials.";
    } else if (error.code === 'ESOCKET') {
      errorMessage = "Network error. Please try again later.";
    } else if (error.code === 'ECONNECTION') {
      errorMessage = "Cannot connect to email service. Please try again.";
    } else if (error.name === 'ValidationError') {
      errorMessage = Object.values(error.errors).map(e => e.message).join(', ');
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { sendMessage };