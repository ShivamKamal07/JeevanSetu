const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },

  senderId: String,

  receiverId: String,

  message: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRead: {
  type: Boolean,
  default: false,
},
});

module.exports = mongoose.model("Chat", chatSchema);