const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  nextPatient,
  getUserAppointments,
  cancelAppointment,
  getDoctorAppointments,
  getQueueStatus,
  markEmergency,
} = require("../controllers/appointmentController");


router.post("/book", bookAppointment);
router.get("/user/:userId", getUserAppointments);
router.get("/doctor/:doctorId", getDoctorAppointments);
router.get("/queue/:doctorId/:patientId", getQueueStatus);
router.post("/next/:doctorId", nextPatient);
router.patch("/emergency/:id", markEmergency);
router.delete("/:id", cancelAppointment);


module.exports = router;
