import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
   

    try {
      const res = await login(form);
     
      if (res && res.token) {
        console.log("LOGIN RESPONSE:", res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);

      
        if (res.role === "patient") {
          navigate("/patient");
        } else {
          navigate("/doctor");
        }
         window.location.reload();
      } else {
    
        setMessage(res?.msg || "Invalid email or password");
      }
    } catch (err) {
    
      setMessage("Connection failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4 mt-5 shadow p-4 rounded bg-white">
        
        
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
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

          {/* Password Input */}
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

       
          <Button 
            type="submit" 
            text="Login" 
            customColor="#42adad" 
            fullWidth 
            loading={loading} 
          />

       
          {message && (
            <div className="alert alert-danger mt-3 text-center py-2" style={{ fontSize: "0.9rem" }}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;

