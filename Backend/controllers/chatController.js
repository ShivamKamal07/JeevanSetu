const Chat = require("../models/chat");

exports.sendMessage = async (req, res) => {
  try {

    console.log("CHAT BODY:", req.body);

    const chat = await Chat.create(req.body);
console.log("SAVED CHAT:", chat);
    res.json(chat);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Message send failed",
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const chats = await Chat.find({
      appointmentId,
    }).sort({
      createdAt: 1,
    });

    res.json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error",
    });
  }
};
exports.markAsRead = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    await Chat.updateMany(
      {
        appointmentId,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};


exports.getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("CHECKING USER:", userId);

    const chats = await Chat.find({
      receiverId: userId,
      isRead: false,
    });

    console.log("MATCHED CHATS:", chats);

    res.json({
      count: chats.length,
    });
  } catch (err) {
    console.log(err);
  }
};


exports.getUnreadByAppointment = async (req, res) => {
  try {
    const { appointmentId, userId } = req.params;

    const count = await Chat.countDocuments({
      appointmentId,
      receiverId: userId,
      isRead: false,
    });

    res.json({ count });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error",
    });
  }
};