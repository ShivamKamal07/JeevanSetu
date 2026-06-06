const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyToken = require("../middleware/authMiddleware");
const Doctor = require("../models/doctor");
const router = express.Router();


// 🔐 SIGNUP
router.post("/signup", async (req, res) => {
  try {
   const {
  name,
  email,
  password,
  role,
  specialization,
  fee,
  location,
} = req.body;

    // ✅ validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be 6+ characters" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
if (user.role === "doctor") {
  
console.log("DOCTOR SIGNUP RUNNING");
console.log(req.body);
  const newDoctor = new Doctor({
  userId: user._id,
  name: name,
  specialization: specialization,
  consultationFee: fee,
  location: location,
  availableSlots: [],
  avgConsultationTime: 10,
});

  await newDoctor.save();

  console.log("Doctor profile created");
}
   let doctorProfileId = null;

if (user.role === "doctor") {
  const doctor = await Doctor.findOne({
    userId: user._id,
  });

  doctorProfileId = doctor?._id;
}

res.status(200).json({
  success: true,
  token,
  role: user.role,
  userId: user._id,
  doctorProfileId,
  name: user.name,
});

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
 console.log("TOKEN:", token);
 let doctorProfileId = null;

if (user.role === "doctor") {
  const doctorProfile = await Doctor.findOne({
    userId: user._id,
  });

  doctorProfileId = doctorProfile?._id;
}
  res.status(200).json({
  success: true,
  token,
  role: user.role,
  userId: user._id,
  doctorProfileId,
  name: user.name,
});

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// 🔐 PROTECTED ROUTE
router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "User authenticated",
    user: req.user,
  });
});

module.exports = router;