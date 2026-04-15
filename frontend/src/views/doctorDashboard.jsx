// function DoctorDashboard(){
//     return <h1>doctor dashboard</h1>;
// }
// export default DoctorDashboard;


import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchWithAuth } from "../services/api";


function DoctorDashboard() {
  const navigate = useNavigate();
useEffect(() => {
  fetchWithAuth("/auth/profile").then(res => console.log(res));
}, []);
  return (
    <div>
      <h1>Doctor Dashboard</h1>

      <button onClick={() => navigate("/queue")}>
        Manage Queue
      </button>

      <button
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default DoctorDashboard;