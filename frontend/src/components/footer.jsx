import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from "../assets/logo.jpeg";
const Footer = () => {
  return (
    <footer  style={{ backgroundColor: "#213e5e", color: "#f0ebeb" }} className=" py-5 mt-auto">
     
      <Container>
        <Row className="gy-4">
      
          <Col lg={3} md={6}>
            <img src={logo} alt="Logo" className="mb-3" style={{ height: '50px' }} />
            <div className="d-grid gap-2">
              <button className="btn btn-outline-light btn-sm">Connect on Social Media</button>
            </div>
            <p className="mt-3 small">Last Updated: April 10, 2026</p>
            <p className="small">Visitors: 0691349</p>
          </Col>

        
          <Col lg={2} md={6}>
            <h5 className="mb-4">Digital India</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-white text-decoration-none">Initiatives</a></li>
              <li><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
            </ul>
          </Col>

        
          <Col lg={2} md={6}>
            <h5 className="mb-4">Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Events</a></li>
              <li><a href="#" className="text-white text-decoration-none">Press Release</a></li>
              <li><a href="#" className="text-white text-decoration-none">Videos</a></li>
            </ul>
          </Col>

         
          <Col lg={5} md={6}>
            <Row>
              <Col sm={6}>
                <h5 className="mb-4">Help & Support</h5>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white text-decoration-none">Right to Information</a></li>
                  <li><a href="#" className="text-white text-decoration-none">FAQ</a></li>
                </ul>
              </Col>
              <Col sm={6}>
                <h5 className="mb-4">Contact Us</h5>
                <p className="small mb-1">NeGD, Ministry of Electronics & IT</p>
                <p className="small mb-1">Helpline: 10905</p>
                <img src="/india-gov-logo.png" alt="India Gov" className="mt-2" style={{ height: '30px' }} />
              </Col>
            </Row>
          </Col>
        </Row>
        
        <hr className="my-4 border-secondary" />
        
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small">
          <p className="mb-0">© 2026 Copyright Ministry of Electronics & IT. All rights reserved.</p>
          <div className="mt-2 mt-sm-0">
            <a href="#" className="text-white me-3 text-decoration-none">Terms and Conditions</a>
            <a href="#" className="text-white text-decoration-none">Feedback</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
