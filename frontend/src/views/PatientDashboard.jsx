import React, { useEffect, useState, useCallback } from "react"; // ✅ add useCallback
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  ThermometerHalf, Search, CalendarCheck,
  ListStars, PersonCircle,
} from "react-bootstrap-icons";
import { fetchWithAuth } from "../services/api";

const SidebarLink = ({ icon: Icon, label }) => (
  <li className="nav-item mb-2">
    <a href="#" className="nav-link d-flex align-items-center gap-2 py-3 px-4 text-light opacity-75">
      <Icon size={18} />
      <span>{label}</span>
    </a>
  </li>
);

export default function PatientDashboard() {
  const [queue, setQueue] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Fix 1: add loading state

  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");

  // ✅ Fix 2: wrap in useCallback so useEffect deps are stable
  const loadData = useCallback(async () => {
    try {
      const appt = await fetchWithAuth(`/appointments/user/${userId}`);
      setAppointments(appt || []);

      if (appt && appt.length > 0) {
        const doctorId = appt[0]?.doctorId?._id;
        if (doctorId) { // ✅ Fix 3: guard against undefined doctorId
          const q = await fetchWithAuth(`/appointments/queue/${doctorId}/${userId}`);
          setQueue(q);
        }
      }
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false); // ✅ Fix 1: stop loading
    }
  }, [userId]);

  useEffect(() => {
    if (userId) loadData();
  }, [userId, loadData]); // ✅ Fix 2: loadData in deps now safe

  useEffect(() => {
    const interval = setInterval(() => loadData(), 10000);
    return () => clearInterval(interval);
  }, [loadData]); // ✅ Fix 2: stable reference

  useEffect(() => {
    const checkRefresh = () => {
      if (localStorage.getItem("refreshAppointments") === "true") {
        loadData();
        localStorage.removeItem("refreshAppointments");
      }
    };
    checkRefresh();
    window.addEventListener("focus", checkRefresh);
    return () => window.removeEventListener("focus", checkRefresh);
  }, [loadData]); // ✅ Fix 2: stable reference

  const cancelAppointment = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return; // ✅ better than alert
    try {
      await fetchWithAuth(`/appointments/${id}`, { method: "DELETE" });
      setAppointments((prev) => prev.filter((a) => a._id !== id));
      setQueue(null); // ✅ clear queue if appointment cancelled
    } catch (err) {
      console.error(err);
    }
  };

  const upcomingAppointments = appointments
    .filter((a) => a.status !== "Cancelled")
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const appointment = upcomingAppointments?.[0] || null;

  // ✅ Fix 1: show loader while fetching
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
      <aside className="d-flex flex-column flex-shrink-0 bg-dark text-white shadow" style={{ width: "260px" }}>
        <ul className="nav nav-pills flex-column mb-auto px-0">
          <Link to="/symptom" style={{ textDecoration: "none" }}>
            <SidebarLink icon={ThermometerHalf} label="AI Symptoms" />
          </Link>
          <Link to="/doctors" style={{ textDecoration: "none" }}>
            <SidebarLink icon={Search} label="Find Doctor" />
          </Link>
          <Link to="/book" style={{ textDecoration: "none" }}>
            <SidebarLink icon={CalendarCheck} label="Book Appointment" />
          </Link>
          <SidebarLink icon={ListStars} label="Queue Status" />
          <SidebarLink icon={PersonCircle} label="My Appointments" />
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-grow-1 p-5 overflow-auto">
        {/* Profile */}
        <header className="card border-0 shadow-sm rounded-4 p-4 mb-5">
          <div className="d-flex align-items-center gap-4">
            <PersonCircle size={70} className="text-info" />
            <div>
              <h2 className="h4 fw-bold mb-1">{name || "User"}</h2>
              <div className="text-muted small">
                Patient ID: {appointments?.[0]?.patientId?._id || userId || "N/A"}
              </div>
            </div>
          </div>
        </header>

        {/* Upcoming Appointments */}
        <section className="mb-5">
          <h5 className="fw-bold mb-4">Upcoming Appointments</h5>
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appt) => (
              <div key={appt._id} className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                <div className="row align-items-center">
                  <div className="col">
                    <h6 className="text-info fw-bold mb-1">{appt?.doctorId?.name}</h6>
                    <p className="text-muted small mb-2">{appt?.doctorId?.specialization}</p>
                    <div className="small fw-medium">
                      <div>Date: {new Date(appt?.date).toLocaleDateString()}</div> {/* ✅ formatted date */}
                      <div>Time: {appt?.time}</div>
                      <div>
                        Status:{" "}
                        <span className={`badge ${appt?.status === "Confirmed" ? "bg-success" : "bg-warning text-dark"}`}>
                          {appt?.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto d-flex gap-2">
                    <button className="btn btn-outline-secondary px-4 fw-bold">Chat</button>
                    <button
                      onClick={() => cancelAppointment(appt._id)}
                      className="btn btn-danger px-4 fw-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
              <h6>No Upcoming Appointments</h6>
              <p className="text-muted">Book an appointment to get started</p>
            </div>
          )}
        </section>

        {/* Queue */}
        <section>
          <h5 className="fw-bold mb-4">Queue Details</h5>
          {appointment && queue ? (
            <div className="row g-4">
              {[
                { label: "Your Token", value: queue?.yourToken },
                { label: "Current Token", value: queue?.currentToken },
                { label: "People Ahead", value: queue?.patientsAhead },
                { label: "Estimated Time", value: queue?.waitingTime + " min" },
              ].map((stat, index) => (
                <div className="col-md-3" key={index}>
                  <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
                    <p className="text-muted small fw-bold mb-2">{stat.label}</p>
                    <p className="h3 fw-bold mb-0">{stat.value || "--"}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No queue available</p>
          )}
        </section>
      </main>
    </div>
  );
}

