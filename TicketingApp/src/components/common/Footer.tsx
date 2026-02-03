import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="fw-bold mb-3">SpecCon Ticketing System</h5>
            <p className="text-light mb-0">
              Empowering businesses with support, consulting, and training solutions.
            </p>
          </Col>
          <Col md={4}>
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <div className="d-flex flex-column">
              <Link to="/" className="text-light text-decoration-none mb-2">Home</Link>
              <Link to="/client/login" className="text-light text-decoration-none mb-2">Client Portal</Link>
              <Link to="/agent/login" className="text-light text-decoration-none mb-2">Agent Login</Link>
            </div>
          </Col>
          <Col md={4} className="text-md-end">
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <p className="mb-1">Email: support@speccon.com</p>
            <p className="mb-1">Phone: (123) 456-7890</p>
            <p className="mb-0">© 2024 SpecCon. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;