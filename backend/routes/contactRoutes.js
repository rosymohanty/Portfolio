import express from "express";
import { sendMessage } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/test-db", async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.json({ success: true, message: "Database connected", count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
export default router;