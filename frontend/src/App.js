
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./views/landing";
import Login from "./views/login";
import Signup from "./views/signup";
import PatientDashboard from "./views/PatientDashboard";
import DoctorDashboard from "./views/doctorDashboard";
import Footer from "./components/footer";
function App() {
  return (
    <BrowserRouter>

  
      <Navbar />
<div className="flex-grow-1 ">
  <main className="flex-grow-1" style={{ marginTop: "80px", marginBottom: "80px" }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/patient"
          element={
            <ProtectedRoute roleRequired="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route path="/doctor"
          element={
            <ProtectedRoute roleRequired="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      </main></div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;