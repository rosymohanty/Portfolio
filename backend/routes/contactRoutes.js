const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/contactController");

// ✅ POST /api/contact
router.post("/contact", sendMessage);

// ✅ Optional: GET /api/contact (for testing)
router.get("/contact", (req, res) => {
  res.json({ message: "Contact API is working. Send POST requests to this endpoint." });
});

module.exports = router;