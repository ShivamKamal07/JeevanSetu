import { CheckCircle } from 'lucide-react';
import aboutImage from "../assets/aboutSection.avif";

const AboutSection = () => {
  const features = [
    { icon: <CheckCircle className="text-primary me-2" size={20} />, text: 'Verified Professional Doctors' },
    { icon: <CheckCircle className="text-primary me-2" size={20} />, text: 'Instant Token Generation' },
    { icon: <CheckCircle className="text-primary me-2" size={20} />, text: '24/7 Symptom Analysis' },
    { icon: <CheckCircle className="text-primary me-2" size={20} />, text: 'Secure Medical Records' },
  ];

  return (
    <section className="lucide-react-5 bg-white">
      <div className="container py-lg-5">
        <div className="row align-items-center g-5">
          
         
          <div className="col-lg-6">
            <div className="position-relative">
              <img 
                src={aboutImage} 
                alt="Medical Team" 
                className="img-fluid rounded-4 shadow-lg"
              />
              <div className="position-absolute bottom-0 start-0 style={ backgroundColor: 'rgba(69, 181, 65, 0.7)' } text-white p-4 rounded-4 m-3 shadow-lg d-none d-md-block">
                <div className="d-flex align-items-center">
                  <h2 className="fw-bold mb-0 me-3">10+</h2>
                  <p className="small mb-0">Years of Excellence in <br/>Digital Healthcare</p>
                </div>
              </div>
            </div>
          </div>

      
          <div className="col-lg-6">
            <h6 className="text-grey fw-bold text-uppercase mb-3" >About Our Platform</h6>
            <h2 className="display-5 fw-bold mb-4">Your Health, Our Priority: Anytime, Anywhere.</h2>
            <p className="text-muted mb-4">
              We bridge the gap between patients and healthcare professionals. Our platform simplifies medical consultations by allowing you to analyze symptoms, find the right specialists, and book appointments in just a few clicks.
            </p>

            <div className="row g-3 mb-4">
              {features.map((f, i) => (
                <div key={i} className="col-md-6 d-flex align-items-center">
                  {f.icon}
                  <span className="fw-medium text-secondary">{f.text}</span>
                </div>
              ))}
            </div>

            <div className="d-flex gap-3 border-top pt-4 mt-4">
              <div className="text-center pe-4 border-end">
                <h4   className="fw-bold  mb-0" style={{color: "#213e5e"} } >50k+</h4>
                <small className="text-muted">Happy Patients</small>
              </div>
              <div className="text-center px-4 border-end">
                <h4 className="fw-bold  mb-0" style={{color: "#213e5e"} }>1.2k+</h4>
                <small className="text-muted">Expert Doctors</small>
              </div>
              <div className="text-center ps-4">
                <h4 className="fw-bold  mb-0" style={{color: "#213e5e"} }>4.9</h4>
                <small className="text-muted">User Rating</small>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
