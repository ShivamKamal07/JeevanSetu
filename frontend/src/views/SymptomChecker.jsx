import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [input, setInput] = useState("");

  const addSymptom = () => {
    if (input.trim() === "") return;
    setSymptoms([...symptoms, input.trim()]);
    setInput("");
  };

  const removeSymptom = (index) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const removeAll = () => setSymptoms([]);

  const goToPage = () => {
    window.location.href = "drList.html";
  };

  return (
    <>
      {/* Bootstrap CDN */}
      <link
        rel="stylesheet"
        href="https://jsdelivr.net"
      />

      <style>{`
        body {
          background: linear-gradient(135deg, #e0f2f2, #f4ffff);
          min-height: 100vh;
          font-family: "Segoe UI", Arial, sans-serif;
        }
        .custom-card {
          border: none;
          border-radius: 14px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          transition: 0.3s;
        }
        .custom-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .btn-teal {
          background: linear-gradient(135deg, #66b2b2, #0F766E);
          border: none;
          color: white;
        }
        .btn-teal:hover {
          background: linear-gradient(135deg, #0F766E, #0D635D);
          color: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .symptom-tag {
          background: #CCFBF1;
          color: #0F766E;
          border-radius: 25px;
          padding: 5px 15px;
          display: inline-flex;
          align-items: center;
          margin: 5px;
          font-weight: 500;
        }
        .symptom-tag button {
          background: none;
          border: none;
          margin-left: 8px;
          color: #374151;
          font-weight: bold;
          line-height: 1;
        }
      `}</style>

      <div className="container py-5" style={{ maxWidth: "800px" }}>
        {/* Search Box Section */}
        <div className="card custom-card p-4 mb-4">
          <div className="row g-2">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Type symptoms (e.g., Fever, Headache)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSymptom()}
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-teal btn-lg" onClick={addSymptom}>
                Add
              </button>
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-outline-secondary btn-lg" onClick={removeAll}>
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="mb-4">
          {symptoms.map((symptom, index) => (
            <span key={index} className="symptom-tag">
              {symptom}
              <button onClick={() => removeSymptom(index)}>&times;</button>
            </span>
          ))}
        </div>

        {/* Results Sections */}
        <div className="card custom-card p-4 mb-3">
          <h5 className="fw-bold mb-3">Possible Conditions:</h5>
          <ul className="mb-0">
            <li>Viral Fever <span className="text-muted small">(Common)</span></li>
            <li>Flu <span className="text-muted small">(Moderate)</span></li>
            <li>Dengue <span className="text-muted small">(If severe symptoms)</span></li>
          </ul>
        </div>

        <div className="card custom-card p-4 mb-3">
          <h5 className="fw-bold mb-3">Recommended Specialist:</h5>
          <ul className="mb-0">
            <li>General Physician (Primary)</li>
            <li>Internal Medicine Doctor</li>
          </ul>
        </div>

        <div className="card custom-card p-4 mb-4">
          <h5 className="fw-bold mb-3">Urgency Level:</h5>
          <ul className="mb-0">
            <li className="text-success">Normal – Book within 24 hrs</li>
            <li className="text-warning">Moderate – Book soon</li>
            <li className="text-danger">Urgent – Seek immediate care</li>
          </ul>
        </div>

        {/* Action Button */}
       <Link to="/doctors" style={{ textDecoration: "none" }}>
  <button className="btn btn-teal btn-lg w-100 py-3 fw-bold shadow-sm">
    Find Doctors Near You
  </button>
</Link>


        
        <p className="text-center mt-4 text-secondary small">
          This is not a medical diagnosis. Please consult a certified doctor.
        </p>
      </div>
    </>
  );
};

export default SymptomChecker;
