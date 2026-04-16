import React, { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchWithAuth } from "../services/api";
import { PersonCircle } from "react-bootstrap-icons";

// ✅ moved outside (fixes warning)
const dummyAppointments = [
  {
    _id: "1",
    doctorId: {
      name: "Dr. Amit Sharma",
      specialization: "General Physician",
    },
    date: new Date().toISOString(),
    status: "waiting",
  },
  {
    _id: "2",
    doctorId: {
      name: "Dr. Mansi Bhaskar",
      specialization: "Internal Medicine",
    },
    date: new Date(Date.now() + 86400000).toISOString(),
    status: "Confirmed",
  },
];

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  // ✅ format functions
  const formatDate = (date) => {
    if (!date) return "--";
    const d = new Date(date);
    return isNaN(d) ? "--" : d.toLocaleDateString();
  };

  const formatTime = (date) => {
    if (!date) return "--";
    const d = new Date(date);
    return isNaN(d)
      ? "--"
      : d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  // ✅ Load appointments
  const loadAppointments = useCallback(async () => {
    try {
      const res = await fetchWithAuth(`/appointments/user/${userId}`);

      if (res && res.length > 0) {
        setAppointments(res);
      } else {
        setAppointments(dummyAppointments); // fallback
      }
    } catch (err) {
      console.error("Appointments error:", err);
      setAppointments(dummyAppointments); // fallback
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) loadAppointments();
  }, [userId, loadAppointments]);

  // 🔁 auto refresh
  useEffect(() => {
    const interval = setInterval(() => loadAppointments(), 10000);
    return () => clearInterval(interval);
  }, [loadAppointments]);

  const cancelAppointment = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;

    try {
      await fetchWithAuth(`/appointments/${id}`, { method: "DELETE" });
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-info" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">My Appointments</h2>

      {appointments.length > 0 ? (
        appointments.map((appt) => (
          <div
            key={appt._id}
            className="card p-4 shadow-sm rounded-4 mb-4"
          >
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-3">
                  <PersonCircle size={50} className="text-info" />
                  <div>
                    <h5 className="mb-1">
                      {appt?.doctorId?.name || "Doctor"}
                    </h5>
                    <p className="text-muted mb-0">
                      {appt?.doctorId?.specialization || ""}
                    </p>
                  </div>
                </div>

                <div className="mt-3 small">
                  <div>Date: {formatDate(appt?.date)}</div>
                  <div>Time: {formatTime(appt?.date)}</div>
                  <div>
                    Status:{" "}
                    <span
                      className={`badge ${
                        appt?.status === "Confirmed"
                          ? "bg-success"
                          : appt?.status === "Cancelled"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {appt?.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-auto">
                <button
                  onClick={() => cancelAppointment(appt._id)}
                  className="btn btn-danger fw-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="card text-center p-4 shadow-sm rounded-4">
          <h5>No Appointments Found</h5>
          <p className="text-muted">
            Book your first appointment to get started
          </p>
        </div>
      )}
    </div>
  );
}

export default MyAppointments;