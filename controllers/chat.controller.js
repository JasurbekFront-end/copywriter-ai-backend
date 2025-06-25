import Chat from "../models/chat.model.js";

export const createChat = async (req, res) => {
  const chat = new Chat({
    userId: req.user.id,
    title: req.body.title || "New Chat",
    messages: [],
  });
  const saved = await chat.save();
  res.status(201).json(saved);
};

export const getChats = async (req, res) => {
  const chats = await Chat.find({ userId: req.user.id }).sort({ _id: -1 });
  res.json(chats);
};

export const getChatById = async (req, res) => {
  const chat = await Chat.findOne({ _id: req.params.id, userId: req.user.id });
  if (!chat) return res.status(404).json({ message: "Chat not found" });
  res.json(chat);
};

export const updateChat = async (req, res) => {
  const updated = await Chat.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    {
      messages: req.body.messages,
      ...(req.body.title && { title: req.body.title }), 
    },
    { new: true }
  );
  res.json(updated);
};

