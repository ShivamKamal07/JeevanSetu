const chatRoutes = require("./routes/chatRoutes");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { Server } = require("socket.io");

// Routes import
const authRoutes = require("./routes/authRoutes");
const symptomRoutes = require("./routes/symptomRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

const app = express();
const server = http.createServer(app);


// ================= MIDDLEWARES =================
app.use(cors());

app.use(express.json());


// ================= ROUTES =================
app.use("/api/auth", authRoutes);

app.use("/api/symptoms", symptomRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/doctors", doctorRoutes);
app.use("/api/chat", chatRoutes);

// ================= SOCKET =================
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
   socket.on("joinRoom", (roomId) => {
  socket.join(roomId);
  console.log(`User joined room: ${roomId}`);
});

    

 socket.on("sendMessage", (data) => {
  io.to(data.roomId).emit(
    "receiveMessage",
    data);
  
});

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

});

// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// ================= SERVER =================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});