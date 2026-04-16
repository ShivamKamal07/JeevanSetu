import React, { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchWithAuth } from "../services/api";
import { PersonCircle } from "react-bootstrap-icons";

// ✅ Move dummy data OUTSIDE (fixes hook warning)
const dummyAppointment = {
  doctorId: {
    name: "Dr. Amit Sharma",
    specialization: "General Physician",
  },
};

const dummyQueue = {
  yourToken: 5,
  currentToken: 2,
  patientsAhead: 3,
  waitingTime: 15,
};

function Queue() {
  const [queue, setQueue] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  // ✅ load queue data
  const loadQueue = useCallback(async () => {
    if (!userId) {
      setAppointment(dummyAppointment);
      setQueue(dummyQueue);
      setLoading(false);
      return;
    }

    try {
      const appt = await fetchWithAuth(`/appointments/user/${userId}`);

      if (appt && appt.length > 0) {
        const latest = appt[0];
        setAppointment(latest);

        const doctorId = latest?.doctorId?._id;

        if (doctorId) {
          const q = await fetchWithAuth(
            `/appointments/queue/${doctorId}/${userId}`
          );
          setQueue(q || dummyQueue); // ✅ fallback if API empty
        } else {
          setQueue(dummyQueue);
        }
      } else {
        setAppointment(dummyAppointment);
        setQueue(dummyQueue);
      }
    } catch (err) {
      console.error("Queue error:", err);

      // ✅ fallback if API fails
      setAppointment(dummyAppointment);
      setQueue(dummyQueue);
    } finally {
      setLoading(false);
    }
  }, [userId]); // ✅ clean dependency

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  // 🔁 auto refresh
  useEffect(() => {
    const interval = setInterval(() => loadQueue(), 10000);
    return () => clearInterval(interval);
  }, [loadQueue]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-info" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">Queue Status</h2>

      {/* Appointment Info */}
      {appointment && (
        <div className="card p-4 shadow-sm rounded-4 mb-4">
          <div className="d-flex align-items-center gap-3">
            <PersonCircle size={50} className="text-info" />
            <div>
              <h5 className="mb-1">
                {appointment?.doctorId?.name || "Doctor"}
              </h5>
              <p className="text-muted mb-0">
                {appointment?.doctorId?.specialization || ""}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Queue UI */}
      {queue && (
        <div className="row g-4">
          {[
            { label: "Your Token", value: queue?.yourToken },
            { label: "Current Token", value: queue?.currentToken },
            { label: "People Ahead", value: queue?.patientsAhead },
            {
              label: "Estimated Time",
              value: queue?.waitingTime + " min",
            },
          ].map((item, index) => (
            <div className="col-md-3" key={index}>
              <div className="card text-center p-4 shadow-sm rounded-4">
                <p className="text-muted small fw-bold mb-2">
                  {item.label}
                </p>
                <h3 className="fw-bold text-info">
                  {item.value ?? "--"}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Status Message */}
      <div className="alert alert-info text-center mt-4 rounded-4">
        ⏳ Please wait for your turn. You will be notified shortly.
      </div>
    </div>
  );
}

export default Queue;