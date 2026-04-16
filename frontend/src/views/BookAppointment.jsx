import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../services/api";
import { useSearchParams, useNavigate } from "react-router-dom";

function BookAppointment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const doctorId = searchParams.get("doctorId");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const times = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
  ];

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!doctorId) {
      setError("No doctor selected. Please go back and choose a doctor.");
    }
  }, [doctorId]);

  const bookAppointment = async () => {
    setError("");

    const userId = localStorage.getItem("userId");

    // 🔒 validations
    if (!userId) {
      setError("You are not logged in. Please login first.");
      return;
    }

    if (!doctorId) {
      setError("Doctor not selected.");
      return;
    }

    if (!name.trim() || !phone || !date || !selectedTime) {
      setError("Please fill all details.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Enter valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    // ✅ Convert time to 24hr
    const convertTo24Hour = (time) => {
      const [hourMin, modifier] = time.split(" ");
      let [hours, minutes] = hourMin.split(":");

      if (modifier === "PM" && hours !== "12") {
        hours = parseInt(hours, 10) + 12;
      }
      if (modifier === "AM" && hours === "12") {
        hours = "00";
      }

      return `${hours}:${minutes}`;
    };

    const formattedTime = convertTo24Hour(selectedTime);
    const fullDateTime = `${date}T${formattedTime}:00`;

    try {
      // ✅ FINAL FIXED PAYLOAD
      const payload = {
        patientId: userId,
        doctorId: doctorId,
        name: name.trim(),
        phone,
        date: fullDateTime, // ✅ IMPORTANT FIX
        status: "Pending",
        isEmergency: false,
      };

      console.log("BOOKING PAYLOAD:", payload);

      const res = await fetchWithAuth("/appointments/book", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      console.log("BOOKING RESPONSE:", res);

      if (res && res._id) {
        setShowPopup(true);

        localStorage.setItem("refreshAppointments", "true");

        setTimeout(() => {
          navigate("/patient");
        }, 1500);
      } else {
        setError("Booking failed. Try again.");
      }
    } catch (err) {
      console.error("BOOK ERROR:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "540px" }}>
      <h2 className="text-center mb-4 fw-bold">Book Appointment</h2>

      {doctorId && (
        <div className="alert alert-info py-2 text-center small mb-3">
          Booking for Doctor ID: <strong>{doctorId}</strong>
        </div>
      )}

      <div className="card p-4 shadow rounded-4 border-0">
        {error && (
          <div className="alert alert-danger py-2 small">{error}</div>
        )}

        <input
          className="form-control mb-3"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Enter phone (10 digits)"
          value={phone}
          maxLength={10}
          onChange={(e) =>
            setPhone(e.target.value.replace(/\D/g, ""))
          }
        />

        <input
          className="form-control mb-3"
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
        />

        <p className="fw-bold mb-2 small text-muted">
          Select Time Slot
        </p>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {times.map((time, i) => (
            <button
              key={i}
              type="button"
              className={`btn ${
                selectedTime === time
                  ? "btn-info text-white"
                  : "btn-outline-info"
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>

        <button
          className="btn btn-info text-white w-100 fw-bold rounded-3"
          onClick={bookAppointment}
          disabled={loading}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm me-2" />
          )}
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </div>

      {/* ✅ SUCCESS POPUP */}
      {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div className="bg-white p-4 rounded-4 text-center shadow">
            <div style={{ fontSize: "2.5rem" }}>✅</div>
            <h4 className="mt-2">Appointment Booked!</h4>
            <p className="text-muted mb-0">
              {name}, redirecting...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookAppointment;