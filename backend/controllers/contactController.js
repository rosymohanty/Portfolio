import Contact from "../models/contactModel.js";
import { sendEmail } from "../utils/sendEmail.js";

// Rest of your code...

export const sendMessage = async (req, res, next) => {
  try {
    let { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    name = name.trim();
    email = email.trim();
    message = message.trim();

    if (name.length > 100 || message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Input too long",
      });
    }

    if (message.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Message too short",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Save to database
    await Contact.create({ name, email, message });

    // Send email (don't await - send in background)
    const safeMessage = message
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");

    // Use sendEmail WITHOUT await to not block response
    sendEmail({
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
        <hr>
        <p><small>Sent from your portfolio website</small></p>
      `,
    }).catch(err => {
      console.error("Background email failed:", err.message);
    });

    // Send response immediately
    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (error) {
    console.error("Contact error:", error);
    next(error);
  }
};