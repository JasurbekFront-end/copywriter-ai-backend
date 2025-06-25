import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const chatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  messages: [messageSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
