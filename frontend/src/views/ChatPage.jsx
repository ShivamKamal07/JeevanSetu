import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchWithAuth } from "../services/api";
import socket from "../services/socket";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

function ChatPage() {
  console.log("CHAT PAGE LOADED");
  const messagesEndRef = useRef(null);
  const { appointmentId } = useParams();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");
const location = useLocation();
console.log("LOCATION:", location);
console.log("LOCATION STATE:", location.state);

const receiverId =
  location.state?.receiverId;
  console.log("RECEIVER ID:", receiverId);
  useEffect(() => {
    loadMessages();

    socket.emit("joinRoom", appointmentId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [appointmentId]);


  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

useEffect(() => {
  fetchWithAuth(
    `/chat/read/${appointmentId}`,
    {
      method: "PUT",
    }
  );
}, [appointmentId]);

  const loadMessages = async () => {
    try {
      const data = await fetchWithAuth(
        `/chat/${appointmentId}`
      );

      setMessages(data || []);
    } catch (err) {
      console.log(err);
    }
  };

const sendMessage = async () => {
  if (!message.trim()) return;

const msgData = {
  appointmentId,
  senderId: userId,
  receiverId,
  message,
  roomId: appointmentId,
};
console.log("SENDING:", msgData);
console.log(
  "TYPE OF RECEIVER:",
  typeof receiverId
);

console.log(
  "RECEIVER VALUE:",
  receiverId
);

  try {
    await fetchWithAuth("/chat", {
      method: "POST",
      body: JSON.stringify(msgData),
    });

    socket.emit("sendMessage", msgData);

    setMessage("");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="container py-4">
      <div
        className="card shadow-sm"
        style={{ height: "80vh" }}
      >
        <div className="card-header fw-bold">
          Chat
        </div>

        <div
          className="card-body overflow-auto"
          style={{ height: "65vh" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex mb-3 ${
                msg.senderId === userId
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-2 rounded ${
                  msg.senderId === userId
                    ? "bg-primary text-white"
                    : "bg-light"
                }`}
                style={{
                  maxWidth: "300px",
                }}
              >
                {msg.message}
              </div>
            </div>
          ))}
            <div ref={messagesEndRef}></div>
        </div>

        <div className="card-footer d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Type message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
          />

          <button
            onClick={sendMessage}
            className="btn btn-primary"
          >
            Send
          </button>
        
        </div>
      </div>
    </div>
  );
}

export default ChatPage;