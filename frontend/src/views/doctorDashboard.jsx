import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { fetchWithAuth } from "../services/api";
import {
  PersonCircle, PeopleFill, ClockHistory,
   BoxArrowRight,
} from "react-bootstrap-icons";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const doctorId = localStorage.getItem("doctorProfileId");
  const name = localStorage.getItem("name");

  const loadAppointments = useCallback(async () => {
    try {
      const res = await fetchWithAuth(`/appointments/doctor/${doctorId}`);
      setAppointments(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  useEffect(() => {
    if (doctorId) loadAppointments();
  }, [doctorId, loadAppointments]);

  // Auto-refresh every 15s (queue changes)
  useEffect(() => {
    const interval = setInterval(loadAppointments, 15000);
    return () => clearInterval(interval);
  }, [loadAppointments]);

 const handleLogout = () => {
  localStorage.clear();
  navigate("/login");
};

const updateStatus = async (id, status) => {
  try {
    await fetchWithAuth(`/appointments/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });

    loadAppointments();
  } catch (err) {
    console.log(err);
  }
};

  const upcoming = appointments.filter((a) => a.status !== "completed");
const todayStr = new Date().toISOString().split("T")[0];

const todayAppts = upcoming.filter((a) => {
  const apptDate = new Date(a.createdAt)
    .toISOString()
    .split("T")[0];

  return (
    apptDate === todayStr &&
    a.status !== "completed"
  );
});

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-info" role="status" />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0 d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className="d-flex flex-column bg-dark text-white shadow" style={{ width: "260px" }}>
        <div className="p-4 border-bottom border-secondary">
          <PersonCircle size={48} className="text-info mb-2" />
          <div className="fw-bold">{name || "Doctor"}</div>
          <div className="text-muted small">Doctor</div>
        </div>
        <ul className="nav nav-pills flex-column mb-auto px-0 mt-2">
          <li className="nav-item">
            <span className="nav-link d-flex align-items-center gap-2 py-3 px-4 text-light opacity-75">
              <PeopleFill size={18} /> My Appointments
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link d-flex align-items-center gap-2 py-3 px-4 text-light opacity-75">
              <ClockHistory size={18} /> Queue
            </span>
          </li>
        </ul>
        <div className="p-3 mt-auto">
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <BoxArrowRight size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-grow-1 p-5 overflow-auto">
        {/* Stats */}
        <div className="row g-4 mb-5">
          {[
            { label: "Total Appointments", value: upcoming.length, color: "text-info" },
            { label: "Today's Appointments", value: todayAppts.length, color: "text-success" },
            { label: "Queue Now", value: todayAppts.length, color: "text-warning" },
          ].map((s, i) => (
            <div className="col-md-4" key={i}>
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
                <p className="text-muted small fw-bold mb-1">{s.label}</p>
                <p className={`h2 fw-bold mb-0 ${s.color}`}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Today's Appointments */}
        <section>
          <h5 className="fw-bold mb-4">Today's Appointments</h5>
          {todayAppts.length > 0 ? (
            todayAppts.map((appt) => (
              <div key={appt._id} className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                <div className="row align-items-center">
                  <div className="col">
                    <h6 className="fw-bold mb-1">
                      {/* {appt?.patientId?.name || "Patient"}  */}
                      {appt?.patientName || "Patient"}
                    </h6>
                    <div className="text-muted small">
                      Time:{" "}
                  {new Date(appt?.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })} &nbsp;|&nbsp; Token: #{appt?.tokenNumber || "N/A"}
                    </div>
                  </div>
                  <div className="col-auto">
                    <span
  className={`badge ${
    appt.status === "waiting"
      ? "bg-warning text-dark"
      : appt.status === "serving"
      ? "bg-success"
      : "bg-secondary"
  }`}
>
                      {appt.status}
                    </span>
                  </div>
                <div className="col-auto d-flex gap-2">
  {appt.status === "waiting" && (
    <button
      onClick={() =>
        updateStatus(appt._id, "serving")
      }
      className="btn btn-success btn-sm"
    >
      Accept
    </button>
  )}

  {appt.status === "serving" && (
    <button
      onClick={() =>
        updateStatus(appt._id, "completed")
      }
      className="btn btn-secondary btn-sm"
    >
      Complete
    </button>
  )}

  <button className="btn btn-outline-info btn-sm">
    Chat
  </button>
</div>
                </div>
              </div>
            ))
          ) : (
            <div className="card border-0 shadow-sm rounded-4 p-4 text-center text-muted">
              No appointments scheduled for today
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default DoctorDashboard;

