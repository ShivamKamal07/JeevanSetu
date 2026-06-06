const express = require("express");

const router = express.Router();

const {
  sendMessage,
  getMessages,
   markAsRead,
   getUnreadCount,
    getUnreadByAppointment,
} = require("../controllers/chatController");

router.post("/", sendMessage);

router.get("/:appointmentId", getMessages);

router.put(
  "/read/:appointmentId",
  markAsRead
);

router.get(
  "/unread/:userId",
  getUnreadCount
);
module.exports = router;

router.get(
  "/unread/:appointmentId/:userId",
  getUnreadByAppointment
);