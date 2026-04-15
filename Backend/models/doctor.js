const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  specialization: String,
  fee: Number,
  location: String,
  availableSlots: [String],
  avgConsultationTime: Number
});

module.exports = mongoose.model("Doctor", doctorSchema);