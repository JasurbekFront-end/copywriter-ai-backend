import express from "express";
import { createChat, getChats, getChatById, updateChat } from "../controllers/chat.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import Chat from "../models/chat.model.js";
const router = express.Router();

router.use(verifyToken);

router.post("/", createChat);
router.get("/", getChats);
router.get("/:id", getChatById);
router.put("/:id", updateChat);
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Chat.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete chat" });
  }
});
export default router;
