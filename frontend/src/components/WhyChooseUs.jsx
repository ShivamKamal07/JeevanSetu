import { Container, Row, Col } from 'react-bootstrap';
import { GiBrain } from 'react-icons/gi';
import { FaUserMd, FaCalendarCheck, FaClock } from 'react-icons/fa';

const WhyChooseUs = () => {
 const features = [
  {
    icon: <GiBrain size={40} color="#42adad" />,
    title: "AI Symptom Checker",
    text: "Analyze your symptoms instantly with smart AI suggestions."
  },
  {
    icon: <FaUserMd size={40} color="#42adad" />,
    title: "Find Doctors",
    text: "Search nearby doctors based on specialization and fees."
  },
  {
    icon: <FaCalendarCheck size={40} color="#42adad" />,
    title: "Easy Booking",
    text: "Book appointments quickly without any hassle."
  },
  {
    icon: <FaClock size={40} color="#42adad"/>,
    title: "Live Queue",
    text: "Track your token and reduce waiting time efficiently."
  }
];

  return (
    <section className="py-5 bg-white mt-5">
      <Container>
        
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3" style={{ color: '#444' }}>Why choose JeevanSetu?</h2>
          <div 
            style={{ width: '60px', height: '30px', borderBottom: '3px solid color="#47d8d8"', margin: '0 auto 20px' }} 
          />
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            JeevanSetu is unique. Nowhere else will you find such a concentration of 
            medical expertise and digital excellence.
          </p>
        </div>

     
        <Row className="gy-4">
          {features.map((item, index) => (
            <Col key={index} lg={3} md={6} className="text-center">
              <div className="mb-4 d-flex justify-content-center">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center" 
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    border: '2px solid #42adad',
                    padding: '20px' 
                  }}
                >
                  {item.icon}
                </div>
              </div>
              <h5 className="fw-bold mb-3">{item.title}</h5>
              <p className="small text-muted px-2">
                {item.text}
              </p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
