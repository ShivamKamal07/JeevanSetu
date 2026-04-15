const BASE_URL = "http://localhost:5000/api/auth";

// SIGNUP
export const signup = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return { msg: result.msg || "Signup failed" };
    }

    return result;
  } catch (err) {
    console.error("Signup error:", err);
    return { msg: "Server error" };
  }
};


// LOGIN
export const login = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    console.log("LOGIN RESPONSE:", result); // 🔥 DEBUG

    if (!res.ok) {
      return { msg: result.msg || "Login failed" };
    }

    return result;
  } catch (err) {
    console.error("Login error:", err);
    return { msg: "Server error" };
  }
};