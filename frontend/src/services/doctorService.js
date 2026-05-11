import axios from "axios";

const API = "http://localhost:5000/api/doctors";

export const getDoctors = async () => {
  try {
    const res = await axios.get(API);

    console.log("FULL RESPONSE:", res);

    console.log("RESPONSE DATA:", res.data);

    return res.data;
  } catch (err) {
    console.log("DOCTOR API ERROR:", err);

    return [];
  }
};