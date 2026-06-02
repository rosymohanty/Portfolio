import nodemailer from "nodemailer";

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    // Clean the password by removing spaces
    const cleanPassword = process.env.EMAIL_PASS?.replace(/\s/g, '');
    
    console.log("📧 Creating email transporter...");
    console.log("- Email User:", process.env.EMAIL_USER);
    console.log("- Password length:", cleanPassword?.length);
    
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: cleanPassword,
      },
    });
    
    // Verify connection
    transporter.verify((error, success) => {
      if (error) {
        console.error("❌ Email verification failed:", error.message);
      } else {
        console.log("✅ Email transporter ready");
      }
    });
  }
  return transporter;
};

export const sendEmail = async ({ subject, html, to }) => {
  try {
    console.log("📧 Preparing to send email...");
    const mailTransporter = getTransporter();
    
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: to || process.env.EMAIL_USER,
      subject: subject,
      html: html,
      replyTo: process.env.EMAIL_USER,
    };
    
    const info = await mailTransporter.sendMail(mailOptions);
    console.log("✅ Email sent! ID:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email send error:", error.message);
    return { success: false, error: error.message };
  }
};