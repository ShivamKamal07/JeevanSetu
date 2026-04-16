import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientQueue = () => {
  const [patientData] = useState({
    doctorName: "Dr. Sharma",
    hospital: "City Hospital",
    yourToken: 12,
    nowServing: 8,
    estimatedTime: "20 min",
    status: "Waiting"
  });

  const [emergencyRequested, setEmergencyRequested] = useState(false);

  useEffect(() => {
    // GSAP Animation with full opacity force
    gsap.fromTo(".status-card-box", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleEmergency = () => {
    if(window.confirm("Request Emergency Priority?")) {
      setEmergencyRequested(true);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f1f5f9', 
      paddingTop: '120px',
      paddingBottom: '50px',
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    }}>
      
      <div className="status-card-box shadow-lg" 
           style={{ 
             maxWidth: '400px', 
             width: '95%', 
             backgroundColor: '#ffffff', 
             borderRadius: '24px',
             height: 'fit-content',
             border: '2px solid #e2e8f0',
             opacity: '1', 
             display: 'block'
           }}>
        
        {/* Header - Bold Blue */}
        <div style={{ 
          backgroundColor: '#007bff', 
          padding: '20px', 
          borderRadius: '24px 24px 0 0',
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <h4 style={{ fontWeight: '800', margin: 0 }}>Live Queue Status</h4>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>{patientData.doctorName} | {patientData.hospital}</p>
        </div>

        <div style={{ padding: '25px' }}>
          {/* Token Box - High Contrast */}
          <div style={{ 
            backgroundColor: '#f8fafc', 
            borderRadius: '20px', 
            padding: '30px 10px', 
            textAlign: 'center',
            marginBottom: '20px',
            border: '1px solid #cbd5e1'
          }}>
            <p style={{ color: '#64748b', fontWeight: 'bold', fontSize: '12px', marginBottom: '5px' }}>YOUR TOKEN</p>
            <h1 style={{ fontSize: '80px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
              {patientData.yourToken}
            </h1>
          </div>

          {/* Info Rows - Jet Black Text */}
          {[
            { label: "Now Serving", value: patientData.nowServing, color: "#0f172a" },
            { label: "Patients Ahead", value: patientData.yourToken - patientData.nowServing, color: "#dc3545" },
            { label: "Estimated Time", value: patientData.estimatedTime, color: "#0f172a" },
            { label: "Status", value: emergencyRequested ? "Emergency" : patientData.status, color: emergencyRequested ? "#dc3545" : "#d97706" }
          ].map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '12px 0', 
              borderBottom: '1px solid #f1f5f9' 
            }}>
              <span style={{ fontWeight: '700', color: '#475569' }}>{item.label}:</span>
              <span style={{ fontWeight: '800', color: item.color, fontSize: '18px' }}>{item.value}</span>
            </div>
          ))}

          {/* Emergency Section */}
          <div style={{ marginTop: '25px' }}>
            {!emergencyRequested ? (
              <button 
                onClick={handleEmergency}
                style={{ 
                  width: '100%', 
                  padding: '15px', 
                  borderRadius: '50px', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  fontWeight: '800',
                  boxShadow: '0 4px 6px rgba(220, 53, 69, 0.3)'
                }}>
                EMERGENCY 
              </button>
            ) : (
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#fff5f5', 
                border: '2px dashed #feb2b2', 
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                <h6 style={{ color: '#c53030', fontWeight: '800' }}>Priority Activated!</h6>
                <p style={{ fontSize: '13px', color: '#7b341e', margin: 0, fontWeight: '600' }}>
                  "Doctor will see you soon. You're moved to priority."
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientQueue;