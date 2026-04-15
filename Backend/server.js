const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes import
const authRoutes = require("./routes/authRoutes");
// const doctorRoutes = require("./routes/doctorRoutes"); // optional
const symptomRoutes = require("./routes/symptomRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes use
app.use("/api/auth", authRoutes);
// app.use("/api/doctors", doctorRoutes); // agar use kar rahe ho to enable karo
app.use("/api/symptoms", symptomRoutes);
app.use("/api/appointments", appointmentRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server start
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});