import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await signup(form);
      
      
      if (res) {
        alert("Signup successful");
        navigate("/login");
      } else {
        setMessage("Signup failed. Please try again.");
      }
    } catch (err) {
      setMessage("An error occurred. Please check your connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "85vh" }} 
    >
      <div className="col-md-4 shadow p-4 rounded bg-white">
        <h2 className="text-center">Signup</h2>

        <form onSubmit={handleSubmit} className="mt-3">
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

        
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

       
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          
          <div className="mb-4">
            <label className="form-label fw-bold">Select Role</label>
            <select
              className="form-select"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

       
          <Button 
            type="submit" 
            text="Signup" 
            customColor="#42adad" 
            fullWidth 
            loading={loading} 
          />

         
          {message && (
            <div className="alert alert-danger mt-3 text-center py-2" style={{ fontSize: "0.9rem" }}>
              {message}
            </div>
          )}

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account? <a href="/login" style={{ color: "#42adad", textDecoration: "none" }}>Login</a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
