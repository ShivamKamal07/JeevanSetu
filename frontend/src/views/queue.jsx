import React, { useState, useEffect } from 'react';

import { gsap } from 'gsap';

const Queue = () => {
  const [patients, setPatients] = useState([
    { id: "JS-101", name: "Rahul Verma", age: 24, status: "In-Progress", type: "Regular" },
    { id: "JS-102", name: "Sita Devi", age: 45, status: "Waiting", type: "Emergency" },
    { id: "JS-103", name: "Amit Sharma", age: 30, status: "Waiting", type: "Regular" },
  ]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    gsap.from(".queue-card", {
      opacity: 0, y: 15, stagger: 0.1, duration: 0.5, ease: "power2.out", clearProps: "all"
    });
  }, [patients.length]);

  const handleComplete = (id) => {
    gsap.to(`#row-${id}`, {
      x: 50, opacity: 0, duration: 0.3,
      onComplete: () => setPatients(prev => prev.filter(p => p.id !== id))
    });
  };

  const handleCallNext = (id) => {
    setPatients(prev => prev.map(p => {
      if (p.id === id) return { ...p, status: "In-Progress" };
      if (p.status === "In-Progress") return { ...p, status: "Waiting" };
      return p;
    }));
  };

  const handleEmergency = () => {
    const name = prompt("Patient Name:");
    if (name) {
      const newP = { id: `JS-${Math.floor(Math.random() * 900) + 100}`, name, age: "--", status: "Waiting", type: "Emergency" };
      setPatients([newP, ...patients]);
    }
  };

  return (
    <div className="container-fluid py-4 min-vh-100" style={{backgroundColor: '#f8fafc'}}>
      <div className="container">
        
        {/* Soft Header */}
        <div className="row mb-4 p-3 bg-white rounded-4 align-items-center shadow-sm border-0">
          <div className="col-md-6">
            <h3 className="fw-bold mb-0" style={{color: '#334155', letterSpacing: '-0.5px'}}>Queue Management</h3>
            <p className="text-muted small mb-0 fw-medium">Doctor's </p>
          </div>
          <div className="col-md-6 text-md-end">
            <span className="badge fw-semibold px-3 py-2" style={{backgroundColor: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd'}}>
              {patients.length} Active Patients
            </span>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead style={{backgroundColor: '#f1f5f9'}}>
                    <tr className="small text-uppercase fw-bold text-muted">
                      <th className="ps-4 py-3 border-0">Token</th>
                      <th className="py-3 border-0">Patient Name</th>
                      <th className="py-3 border-0">Status</th>
                      <th className="text-center py-3 border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((p) => (
                      <tr key={p.id} id={`row-${p.id}`} className="queue-card border-bottom border-light">
                        <td className="ps-4 fw-bold" style={{color: '#0284c7'}}>#{p.id.split('-')[1]}</td>
                        <td>
                          <div className="fw-bold text-dark">{p.name}</div>
                          <small className="text-muted font-monospace">{p.age} yrs • {p.type}</small>
                        </td>
                        <td>
                          <div className="d-flex align-items-center small fw-bold">
                            <span className={`dot me-2 ${p.status === 'In-Progress' ? 'bg-success animate-pulse' : 'bg-warning'}`}></span>
                            <span style={{color: p.status === 'In-Progress' ? '#16a34a' : '#d97706'}}>{p.status}</span>
                          </div>
                        </td>
                        <td className="text-center pe-3">
                          {p.status === "In-Progress" ? (
                            <button onClick={() => handleComplete(p.id)} className="btn btn-sm px-4 rounded-pill fw-bold shadow-sm" style={{backgroundColor: '#10b981', color: '#fff'}}>Complete</button>
                          ) : (
                            <button onClick={() => handleCallNext(p.id)} className="btn btn-sm px-4 rounded-pill fw-bold border" style={{color: '#0284c7', borderColor: '#0284c7'}}>Call Next</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Soft Sidebar Highlight */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-3 text-center" style={{backgroundColor: '#0369a1', color: '#fff'}}>
              <p className="small fw-bold mb-1 opacity-75">NOW SERVING</p>
              <h1 className="display-4 fw-bold mb-0">
                {patients.find(p => p.status === "In-Progress")?.id.split('-')[1] || "---"}
              </h1>
              <p className="small mb-0 opacity-75">{patients.find(p => p.status === "In-Progress")?.name || "No Patient"}</p>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <h6 className="fw-bold mb-3 border-bottom pb-2" style={{color: '#64748b'}}>Quick Actions</h6>
              <button onClick={handleEmergency} className="btn w-100 mb-2 py-2 fw-bold border-0 shadow-sm" style={{backgroundColor: '#fee2e2', color: '#dc2626'}}>
                Add Emergency
              </button>
              <button 
                onClick={() => setIsPaused(!isPaused)} 
                className={`btn w-100 py-2 fw-bold border shadow-sm ${isPaused ? 'btn-success text-white' : 'bg-white text-dark'}`}
              >
                {isPaused ? 'Resume System' : 'Pause System'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dot { height: 10px; width: 10px; border-radius: 50%; display: inline-block; }
        .queue-card { transition: all 0.2s ease; }
        .queue-card:hover { background-color: #f8fafc; }
        .animate-pulse { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(22, 163, 74, 0); }
          100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
        }
      `}</style>
    </div>
  );
};

export default Queue;