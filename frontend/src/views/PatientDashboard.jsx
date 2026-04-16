import React, { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  ThermometerHalf,
  Search,
  CalendarCheck,
  ListStars,
  PersonCircle,
} from "react-bootstrap-icons";
import { fetchWithAuth } from "../services/api";

const SidebarLink = ({ icon: Icon, label }) => (
  <li className="nav-item mb-2">
    <div className="nav-link d-flex align-items-center gap-2 py-3 px-4 text-light opacity-75">
      <Icon size={18} />
      <span>{label}</span>
    </div>
  </li>
);

export default function PatientDashboard() {
  const [queue, setQueue] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");

  // ✅ Format helpers
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

  const loadData = useCallback(async () => {
    // ✅ dummy inside callback (NO WARNING)
    const dummyQueue = {
      yourToken: 5,
      currentToken: 2,
      patientsAhead: 3,
      waitingTime: 15,
    };

    try {
      const appt = await fetchWithAuth(`/appointments/user/${userId}`);
      setAppointments(appt || []);

      if (appt && appt.length > 0) {
        const doctorId = appt[0]?.doctorId?._id;

        if (doctorId) {
          const q = await fetchWithAuth(
            `/appointments/queue/${doctorId}/${userId}`
          );
          setQueue(q || dummyQueue);
        } else {
          setQueue(dummyQueue);
        }
      } else {
        setQueue(dummyQueue);
      }
    } catch (err) {
      console.error("Load error:", err);
      setQueue(dummyQueue);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) loadData();
  }, [userId, loadData]);

  useEffect(() => {
    const interval = setInterval(() => loadData(), 10000);
    return () => clearInterval(interval);
  }, [loadData]);

  const cancelAppointment = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      await fetchWithAuth(`/appointments/${id}`, { method: "DELETE" });
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const upcomingAppointments = appointments
    .filter((a) => a.status !== "Cancelled")
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-info" />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0 d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside
        className="d-flex flex-column flex-shrink-0 bg-dark text-white shadow"
        style={{ width: "260px" }}
      >
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

          <Link to="/queue" style={{ textDecoration: "none" }}>
            <SidebarLink icon={ListStars} label="Queue Status" />
          </Link>

          <Link to="/appointments" style={{ textDecoration: "none" }}>
            <SidebarLink icon={PersonCircle} label="My Appointments" />
          </Link>
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
                Patient ID: {userId || "N/A"}
              </div>
            </div>
          </div>
        </header>

        {/* ✅ ORIGINAL APPOINTMENT UI RESTORED */}
        <section className="mb-5">
          <h5 className="fw-bold mb-4">Upcoming Appointments</h5>

          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appt) => (
              <div
                key={appt._id}
                className="card border-0 shadow-sm rounded-4 p-4 mb-3"
              >
                <div className="row align-items-center">
                  <div className="col">
                    <h6 className="text-info fw-bold mb-1">
                      {appt?.doctorId?.name || "Doctor"}
                    </h6>

                    <p className="text-muted small mb-2">
                      {appt?.doctorId?.specialization || ""}
                    </p>

                    <div className="small fw-medium">
                      <div>Date: {formatDate(appt?.date)}</div>
                      <div>Time: {formatTime(appt?.date)}</div>

                      <div>
                        Status:{" "}
                        <span className="badge bg-warning text-dark">
                          {appt?.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-auto d-flex gap-2">
                    <button className="btn btn-outline-secondary px-4 fw-bold">
                      Chat
                    </button>

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
              <p className="text-muted">
                Book an appointment to get started
              </p>
            </div>
          )}
        </section>

        {/* Queue */}
        <section>
          <h5 className="fw-bold mb-4">Queue Details</h5>

          <div className="row g-4">
            {[
              { label: "Your Token", value: queue?.yourToken },
              { label: "Current Token", value: queue?.currentToken },
              { label: "People Ahead", value: queue?.patientsAhead },
              {
                label: "Estimated Time",
                value: queue?.waitingTime + " min",
              },
            ].map((stat, index) => (
              <div className="col-md-3" key={index}>
                <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
                  <p className="text-muted small fw-bold mb-2">
                    {stat.label}
                  </p>
                  <p className="h3 fw-bold mb-0">
                    {stat.value || "--"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}