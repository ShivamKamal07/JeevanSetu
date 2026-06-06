const Appointment = require("../models/appointment");
const User = require("../models/user");
const Doctor = require("../models/doctor");


exports.bookAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      isEmergency,
      date,
      time,
    } = req.body;

    // patient find
    const patient = await User.findById(patientId);

    // doctor find
    const doctor = await Doctor.findById(doctorId);

    if (!patient || !doctor) {
      return res.status(404).json({
        message: "Patient or Doctor not found",
      });
    }

    // last token
    const last = await Appointment.findOne({
      doctorId,
    }).sort({
      tokenNumber: -1,
    });

    const newToken = last ? last.tokenNumber + 1 : 1;

    // create appointment
    const appointment = await Appointment.create({
      patientId,
      patientName: patient.name,

      doctorId,
      doctorName: doctor.name,
      date: date,
      time: time,

     consultationFee: doctor.consultationFee,
      location: doctor.location,

      tokenNumber: newToken,

      isEmergency: isEmergency || false,

      status: "waiting",
    });

    res.json(appointment);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error booking appointment",
    });
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

    const appointments = await Appointment.find({
      patientId: userId,
    })
      .populate("doctorId", "name specialization")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching appointments",
    });
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

    const appointments = await Appointment.find({
      doctorId,
    })
      .populate("patientId", "name email")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching doctor appointments",
    });
  }
};

exports.getQueueStatus = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;
// console.log("doctorId =", doctorId);
//     console.log("patientId =", patientId);
    
    // active queue only
    const appointments = await Appointment.find({
      doctorId,
      status: { $in: ["waiting", "serving"] },
    }).sort({ tokenNumber: 1 });

    // find patient appointment
   const patientAppointment = appointments.find(
  (a) => String(a.patientId) === String(patientId)
);
    // patient not found
    if (!patientAppointment) {
      return res.json(null);
    }

    // current serving patient
    const servingPatient = appointments.find(
      (a) => a.status === "serving"
    );

    const currentToken = servingPatient
      ? servingPatient.tokenNumber
      : appointments[0]?.tokenNumber || 0;

    const yourToken = patientAppointment.tokenNumber;

    const patientsAhead = Math.max(
      yourToken - currentToken,
      0
    );

    const waitingTime = patientsAhead * 10;

    res.json({
      yourToken,
      currentToken,
      patientsAhead,
      waitingTime,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Queue error",
    });
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
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};