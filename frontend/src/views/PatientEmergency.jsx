import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientEmergency = () => {
  const [step, setStep] = useState(1); 
  const [feeling, setFeeling] = useState("");

  useEffect(() => {
    
    gsap.fromTo(".emergency-card-main", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, [step]);

  const handleSendRequest = () => {
    if (!feeling) return alert("Please enter your condition.");
    setStep(2);
    setTimeout(() => { setStep(3); }, 3000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#fef2f2', 
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '130px', 
      width: '100%',
      position: 'relative',
      zIndex: 1
    }}>
      
    
      <div className="emergency-card-main shadow-lg" 
           style={{ 
             maxWidth: '420px', 
             width: '90%', 
             backgroundColor: '#ffffff', // Force Solid White
             borderRadius: '28px',
             height: 'fit-content',
             border: '2px solid #fee2e2',
             opacity: '1 !important', // Transparency fix
             display: 'block',
             overflow: 'hidden'
           }}>
        
        
        {step === 1 && (
          <div style={{ padding: '30px', textAlign: 'center' }}>
            <h3 style={{ fontWeight: '800', color: '#dc2626', marginBottom: '10px' }}>Emergency Request</h3>
            <p style={{ color: '#4b5563', fontSize: '14px', marginBottom: '20px', fontWeight: '500' }}>
                Describe your condition for the doctor
            </p>
            
            <textarea 
              style={{ 
                width: '100%', 
                backgroundColor: '#f9fafb', 
                border: '1px solid #e5e7eb', 
                borderRadius: '15px', 
                padding: '15px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '20px',
                outline: 'none'
              }}
              rows="4"
              placeholder="Ex: Chest pain, high fever..."
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
            />

            <button 
              onClick={handleSendRequest}
              style={{ 
                width: '100%', 
                backgroundColor: '#dc2626', 
                color: 'white', 
                padding: '15px', 
                borderRadius: '50px', 
                border: 'none', 
                fontWeight: '800',
                fontSize: '16px',
                boxShadow: '0 10px 15px -3px rgba(220, 38, 38, 0.3)'
              }}>
              SEND TO DOCTOR 
            </button>
          </div>
        )}

       
        {step === 2 && (
          <div style={{ padding: '50px', textAlign: 'center' }}>
            <div className="spinner-border text-danger" style={{ width: '3rem', height: '3rem' }}></div>
            <h5 style={{ marginTop: '20px', fontWeight: '700', color: '#111827' }}>Notifying Doctor...</h5>
          </div>
        )}

       
        {step === 3 && (
          <div style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '50px', marginBottom: '10px' }}>✅</div>
            <h4 style={{ fontWeight: '800', color: '#16a34a' }}>Approved!</h4>
            
            <div style={{ 
              backgroundColor: '#f0fdf4', 
              border: '2px dashed #4ade80', 
              padding: '20px', 
              borderRadius: '20px',
              margin: '20px 0'
            }}>
              <p style={{ fontWeight: '700', color: '#166534', fontSize: '18px', margin: 0, lineHeight: '1.5' }}>
                "You have been moved to priority queue. The doctor will see you soon."
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#6b7280', fontSize: '12px', fontWeight: '800', margin: 0 }}>STATUS</p>
              <h2 style={{ color: '#dc2626', fontWeight: '900', margin: 0 }}>EMERGENCY (P)</h2>
            </div>

            <button 
              onClick={() => window.location.href='/patient/status'}
              style={{ 
                width: '100%', 
                backgroundColor: '#111827', 
                color: 'white', 
                padding: '12px', 
                borderRadius: '50px', 
                border: 'none', 
                fontWeight: '700' 
              }}>
              Back to Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientEmergency;