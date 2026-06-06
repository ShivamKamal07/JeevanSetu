// const mongoose = require("mongoose");

// const doctorSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   specialization: String,
//   fee: Number,
//   location: String,
//   availableSlots: [String],
//   avgConsultationTime: Number
// });

// module.exports = mongoose.model("Doctor", doctorSchema);


const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  name: {
    type: String,
    required: true,
  },

  specialization: {
    type: String,
    required: true,
  },

  consultationFee: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  availableSlots: [String],

  avgConsultationTime: {
    type: Number,
    default: 10,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);