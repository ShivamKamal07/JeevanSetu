const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { Server } = require("socket.io");

// Routes import
const authRoutes = require("./routes/authRoutes");
// const doctorRoutes = require("./routes/doctorRoutes"); // optional
const symptomRoutes = require("./routes/symptomRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const server = http.createServer(app);

// Socket setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// io for global import 
app.set("io", io);

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

//Socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  //JOIN ROOM -->doctor wise
  socket.on("joinRoom", (doctorId) => {
    socket.join(doctorId);
    console.log(`User joined room: ${doctorId}`);
  });

  //SEND MESSAGE --> chat
  socket.on("sendMessage", (data) => {
    // data = { doctorId, sender, message }
    io.to(data.doctorId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Server start
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});