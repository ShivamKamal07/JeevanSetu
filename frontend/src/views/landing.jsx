// function Landing(){
//     return <h1>landing page</h1>;
// }
// export default Landing;
import WhyChooseUs from "../components/WhyChooseUs";
import HowItWorks from "../components/HowItWork";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import bgImage from "../assets/landing.jpg";
import AboutSection from "../components/AboutSection";


function Landing() {
  const navigate = useNavigate();
const heroStyle = {
  backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  color: "white",
  zIndex: 1,
position: "relative"
};

  return (<>

    <div style={heroStyle}>
      <Container>
        <Row className="align-items-center">       
          <Col md={6}>
               <h1 className="display-5 fw-bold mb-4">
  Smart Healthcare Made Simple with JeevanSetu
</h1>

<p className="lead mb-5 opacity-75">
  JeevanSetu is an intelligent healthcare platform that helps patients 
  analyze symptoms, find nearby doctors, and book appointments easily. 
  With real-time queue management and digital consultation flow, we 
  make healthcare faster, smarter, and more accessible for everyone.
</p>

<div className="d-flex align-items-center">
  <Button 
    variant="outline-light" 
    className="px-4 py-2 me-3 fw-bold"
    style={{ borderWidth: '2px' }}
    onClick={() => navigate("/signup")}
  >
    Get Started
  </Button>

  <span className="small">
    Trusted by users for <span className="fw-bold">smart healthcare access</span>
  </span>
</div>
          </Col>      
          <Col md={6} className="text-center">
          
            <svg 
              width="300" 
              height="300" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ opacity: 0.6 }}
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              <path d="M12 21c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8z" />
            </svg>
          </Col>
           
        </Row>
         
      </Container>
       
    </div>
 <WhyChooseUs /> 
 <HowItWorks />
 <AboutSection />
 </>
  ); 
}

export default Landing;




