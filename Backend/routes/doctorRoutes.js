const express = require("express");
const router = express.Router();

const Doctor = require("../models/doctor");

// GET ALL DOCTORS
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json(doctors);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching doctors",
    });
  }
});

module.exports = router;