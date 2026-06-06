import axios from "axios";

const API = "http://localhost:5000/api/appointments";

export const bookAppointment = async (data) => {
  try {
    const res = await axios.post(`${API}/book`, data);

    return res.data;
  } catch (err) {
    console.log(err);

    return null;
  }
};