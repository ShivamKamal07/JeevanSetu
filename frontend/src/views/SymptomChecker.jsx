import { useState } from "react";
import { fetchWithAuth } from "../services/api";

export default function SymptomChecker() {
  const [input, setInput] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState(null);

  const addSymptom = () => {
    if (input.trim()) {
      setSymptoms([...symptoms, input.toLowerCase()]);
      setInput("");
    }
  };

  const analyze = async () => {
    try {
      const data = await fetchWithAuth("/symptoms/analyze", {
        method: "POST",
        body: JSON.stringify({ symptoms }),
      });

      setResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* INPUT */}
        <div style={styles.inputRow}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type symptoms (e.g., Fever, Headache)"
            style={styles.input}
          />
          <button onClick={addSymptom} style={styles.addBtn}>
            Add
          </button>
          <button onClick={() => setSymptoms([])} style={styles.clearBtn}>
            Clear
          </button>
        </div>

        {/* SYMPTOMS LIST */}
        {symptoms.length > 0 && (
          <div style={styles.symptomBox}>
            {symptoms.map((s, i) => (
              <span key={i} style={styles.tag}>
                {s}
              </span>
            ))}

            <button onClick={analyze} style={styles.analyzeBtn}>
              Analyze Symptoms
            </button>
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div style={styles.resultBox}>
            <h3 style={styles.heading}>Possible Condition</h3>
            <p>{result.disease}</p>

            <h4 style={styles.heading}>Recommended Specialist</h4>
            <p>{result.doctorType}</p>

            <h4 style={styles.heading}>Urgency Level</h4>
            <p
              style={{
                color:
                  result.severity === "high"
                    ? "red"
                    : result.severity === "medium"
                    ? "orange"
                    : "green",
                fontWeight: "bold",
              }}
            >
              {result.severity}
            </p>

            <button
              onClick={() =>
                (window.location.href = `/doctors?type=${result.doctorType}`)
              }
              style={styles.findBtn}
            >
              Find Doctors Near You
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🔥 STYLES */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #d1f1ec, #e5e7eb)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  inputRow: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  addBtn: {
    background: "#0f766e",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  clearBtn: {
    background: "#f3f4f6",
    border: "1px solid #ccc",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  symptomBox: {
    marginTop: "15px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  tag: {
    background: "#ccfbf1",
    color: "#0f766e",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  analyzeBtn: {
    width: "100%",
    marginTop: "15px",
    background: "#0f766e",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

  resultBox: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    background: "#f9fafb",
  },

  heading: {
    marginTop: "10px",
    marginBottom: "5px",
  },

  findBtn: {
    width: "100%",
    marginTop: "15px",
    background: "#0f766e",
    color: "#fff",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};