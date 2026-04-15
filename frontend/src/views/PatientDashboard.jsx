
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/api";

function PatientDashboard() {
  const [data, setData] = useState("");
useEffect(() => {
  fetchWithAuth("/auth/profile").then(res => console.log(res));
}, []);
  useEffect(() => {
    fetchWithAuth("/profile").then((res) => {
      setData(res.msg);
    });
  }, []);

  return <h2>{" Patient dashboard: "+data}</h2>;
}

export default PatientDashboard;