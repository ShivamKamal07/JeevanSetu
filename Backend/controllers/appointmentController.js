const Appointment = require("../models/appointment");
// const User = require("../models/User");
const User = require("../models/doctor");

exports.bookAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      isEmergency,
      name,
      phone,
      date, // 👈 full datetime aa raha hai frontend se
    } = req.body;

    // ✅ validation
    if (!patientId || !doctorId) {
      return res.status(400).json({
        message: "patientId and doctorId are required",
      });
    }

    // ✅ FIX: doctorId ko safe handle karo
    let doctorFilter = {};
    if (doctorId.length === 24) {
      doctorFilter = { doctorId }; // ObjectId case
    } else {
      doctorFilter = {}; // dummy id → ignore for token
    }

    // ✅ Find last token
    const last = await Appointment.findOne(doctorFilter).sort({
      tokenNumber: -1,
    });

    const newToken = last ? last.tokenNumber + 1 : 1;

    // ✅ Create appointment (ALL fields save karo)
    const appointment = await Appointment.create({
      patientId,
      doctorId: doctorId.length === 24 ? doctorId : null, // 👈 FIX
      name: name || "",
      phone: phone || "",
      date: date ? new Date(date) : null, // 👈 FIX
      tokenNumber: newToken,
      isEmergency: isEmergency || false,
      status: "waiting",
    });

    res.json(appointment);
  } catch (err) {
    console.log("BOOK ERROR:", err);
    res.status(500).json({ message: "Error booking appointment" });
  }
};

exports.nextPatient = async (req, res) => {
  try {
    const { doctorId } = req.params;

    //current ko complete karo
    await Appointment.findOneAndUpdate(
      { doctorId, status: "serving" },
      { status: "completed" },
    );

    //emergency patient pehle
    let next = await Appointment.findOne({
      doctorId,
      status: "waiting",
      isEmergency: true,
    }).sort({ tokenNumber: 1 });

    //agar emergency nahi mila
    if (!next) {
      next = await Appointment.findOne({
        doctorId,
        status: "waiting",
      }).sort({ tokenNumber: 1 });
    }

    //next ko serving bana do
    if (next) {
      next.status = "serving";
      await next.save();
    }

    //
    const io = req.app.get("io");

    io.emit("queueUpdated", {
      doctorId,
      currentToken: next?.tokenNumber || null,
    });

    res.json(next);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error moving queue" });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.find({ patientId: userId })
      .populate("doctorId", "name specialization location")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    await Appointment.findByIdAndDelete(id);

    res.json({ message: "Appointment cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling" });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await Appointment.find({ doctorId })
      .populate("patientId", "name email") // 🔥 patient details
      .sort({ tokenNumber: 1 }); // 🔥 queue order

    res.json(appointments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching doctor appointments" });
  }
};

exports.getQueueStatus = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    //current serving patient
    const current = await Appointment.findOne({
      doctorId,
      status: "serving",
    });

    // current user appointment
    const user = await Appointment.findOne({
      doctorId,
      patientId,
    });

    if (!user) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    //patients ahead
    const ahead = await Appointment.countDocuments({
      doctorId,
      tokenNumber: { $lt: user.tokenNumber },
      status: "waiting",
    });

    // doctor
    const doctor = await User.findById(doctorId);

    const avgTime = doctor?.avgConsultationTime || 10;

    const waitingTime = ahead * avgTime;

    res.json({
      currentToken: current?.tokenNumber || 0,
      yourToken: user.tokenNumber,
      patientsAhead: ahead,
      waitingTime,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Queue error" });
  }
};

exports.markEmergency = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { isEmergency: true },
      { new: true },
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const io = req.app.get("io");

    io.emit("emergencyAlert", {
      appointmentId: appointment._id,
      doctorId: appointment.doctorId,
    });

    res.json(appointment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error marking emergency" });
  }
};
