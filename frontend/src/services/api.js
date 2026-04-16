const API = "http://localhost:5000/api";

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(API + url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (res.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error");
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};