
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  patientName: {
    type: String,
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },

  doctorName: {
    type: String,
  },

  tokenNumber: {
    type: Number,
  },

  consultationFee: {
    type: Number,
  },

  location: {
    type: String,
  },

  isEmergency: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["waiting", "serving", "completed"],
    default: "waiting",
  },
  date: {
  type: String,
},

time: {
  type: String,
},

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);