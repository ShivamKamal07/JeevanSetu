import React from 'react';
import { UserPlus, Activity, Search, CalendarCheck, Ticket } from 'lucide-react';
import howItWork from "../assets/howItWork.jpg";
const ElegantMedicalProcess = () => {
  const steps = [
    { id: '01', title: 'Sign Up', desc: 'Join as a Patient or Doctor', icon: <UserPlus /> },
    { id: '02', title: 'Analysis', desc: 'Detail your health symptoms', icon: <Activity /> },
    { id: '03', title: 'Selection', desc: 'Choose the best specialist', icon: <Search /> },
    { id: '04', title: 'Booking', desc: 'Secure your preferred slot', icon: <CalendarCheck /> },
    { id: '05', title: 'Consult', desc: 'Receive token & meet doc', icon: <Ticket /> },
  ];

  return (
    <section 
      className="py-5 position-relative overflow-hidden" 
      style={{       
        backgroundImage: `url(${howItWork})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '600px'
      }}
    >
     
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" style={{ backdropFilter: 'blur(4px)' }}></div>

      <div className="container position-relative z-1 py-5">
        <div className="text-center mb-5 text-white">
          <h6 className="text-uppercase fw-bold text-info mb-2" style={{ letterSpacing: '3px' }}>The Journey</h6>
          <h2 className="display-5 fw-bold">How It Works</h2>
        </div>

        <div className="row g-4 justify-content-center">
          {steps.map((step) => (
            <div key={step.id} className="col-12 col-md-6 col-lg mx-lg-1">
              <div className="card h-100 border-0 bg-white bg-opacity-10 text-white shadow-lg text-center" 
                   style={{ backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="card-body p-4 d-flex flex-column align-items-center">
                  <div className="h1 position-absolute top-0 end-0 opacity-25 p-3 fw-bold">{step.id}</div>
                  <div className="bg-info bg-opacity-25 p-3 rounded-circle mb-4 text-info">
                    {React.cloneElement(step.icon, { size: 32 })}
                  </div>
                  <h4 className="fw-bold mb-3">{step.title}</h4>
                  <p className="small mb-0 text-light opacity-75">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElegantMedicalProcess;
