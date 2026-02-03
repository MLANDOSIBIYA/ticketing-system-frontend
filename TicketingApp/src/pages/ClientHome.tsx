import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ClientHome: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleCreateTicket = () => {
    navigate('/create-ticket');
  };

  const handleFindExpert = () => {
    navigate('/book-consultant'); // Updated to match your BookConsultant route
  };

  const handleBrowseCourses = () => {
    navigate('/client/training');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* HERO */}
      <div 
        className="text-white py-5"
        style={{
          background: 'linear-gradient(135deg, #0066cc 0%, #004d99 100%)'
        }}
      >
        <Container>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h1 className="fw-bold display-4 mb-3">Building New Futures</h1>
              <h5 className="text-warning mb-4">Through Skills and Knowledge.</h5>
              <p className="fs-5 mb-4">
                Welcome to the SpecCon Opportunity Ecosystem. Access support, expert
                consulting, and world-class training designed for real impact.
              </p>
              {user && (
                <div>
                  <p className="fs-6 text-light mb-1">
                    Logged in as: <span className="fw-bold">{user.fullName || user.email}</span>
                  </p>
                  <p className="fs-6 text-light">
                    Role: <span className="fw-bold text-capitalize">{user.role}</span>
                  </p>
                </div>
              )}
            </div>
            {user && (
              <Button 
                variant="outline-light" 
                size="sm"
                onClick={handleLogout}
                className="mt-2"
              >
                Logout
              </Button>
            )}
          </div>
        </Container>
      </div>

      {/* CARDS */}
      <Container className="py-5">
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 hover-shadow transition-all">
              <Card.Body className="p-4 text-center">
                <div 
                  className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '80px', height: '80px' }}
                >
                  <span style={{ fontSize: '2rem' }}>🎫</span>
                </div>
                <Card.Title className="fw-bold text-primary mb-3">
                  Support Ticket
                </Card.Title>
                <div className="text-muted mb-4">
                  Log tickets for system support, errors, or suggestions.
                  We're here to help you succeed.
                </div>
                <Button 
                  variant="primary" 
                  onClick={handleCreateTicket}
                  className="w-100 py-3 fw-bold"
                  style={{
                    background: 'linear-gradient(135deg, #0066cc 0%, #004d99 100%)',
                    border: 'none'
                  }}
                >
                  Create Ticket →
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-warning border-2 hover-shadow transition-all">
              <Card.Body className="p-4 text-center">
                <div 
                  className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '80px', height: '80px' }}
                >
                  <span style={{ fontSize: '2rem' }}>👔</span>
                </div>
                <Card.Title className="fw-bold text-warning mb-3">
                  Consulting & Bookings
                </Card.Title>
                <div className="text-muted mb-4">
                  Connect with subject matter experts. Book consultations
                  for specialized guidance and growth opportunities.
                </div>
                <Button 
                  variant="warning" 
                  onClick={handleFindExpert}
                  className="w-100 py-3 fw-bold"
                  style={{
                    background: 'linear-gradient(135deg, #ffa600 0%, #ff8f00 100%)',
                    border: 'none',
                    color: '#000'
                  }}
                >
                  Find an Expert →
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 hover-shadow transition-all">
              <Card.Body className="p-4 text-center">
                <div 
                  className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '80px', height: '80px' }}
                >
                  <span style={{ fontSize: '2rem' }}>📚</span>
                </div>
                <Card.Title className="fw-bold text-success mb-3">
                  Training & Courses
                </Card.Title>
                <div className="text-muted mb-4">
                  Schedule training sessions. Empower your team with
                  future-focused skills and certification programs.
                </div>
                <Button 
                  variant="success" 
                  onClick={handleBrowseCourses}
                  className="w-100 py-3 fw-bold"
                  style={{
                    background: 'linear-gradient(135deg, #00cc88 0%, #00aa66 100%)',
                    border: 'none'
                  }}
                >
                  Browse Courses →
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Info Section */}
        <Row className="mt-5 pt-5">
          <Col>
            <Card className="border-0 shadow-sm bg-light">
              <Card.Body className="p-4">
                <h4 className="fw-bold text-primary mb-3">Getting Started</h4>
                <Row>
                  <Col md={4} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                        <span className="fs-5">1️⃣</span>
                      </div>
                      <div>
                        <div className="fw-bold mb-1">Submit Support Request</div>
                        <div className="text-muted small">Use the ticket system for technical issues</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                        <span className="fs-5">2️⃣</span>
                      </div>
                      <div>
                        <div className="fw-bold mb-1">Book Expert Consultation</div>
                        <div className="text-muted small">Schedule sessions with domain specialists</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                        <span className="fs-5">3️⃣</span>
                      </div>
                      <div>
                        <div className="fw-bold mb-1">Access Training</div>
                        <div className="text-muted small">Enroll in courses for skill development</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClientHome;