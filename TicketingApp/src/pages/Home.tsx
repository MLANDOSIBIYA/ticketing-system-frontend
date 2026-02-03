import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home: React.FC = () => {
  const portals = [
    {
      id: 1,
      title: 'Client Portal',
      description: 'Log tickets, book consultants, and manage your requests',
      path: '/login?userType=client',
      color: 'primary',
      icon: '👥'
    },
    {
      id: 2,
      title: 'Agent Dashboard',
      description: 'Manage support tickets and resolve client issues',
      path: '/login?userType=agent',
      color: 'success',
      icon: '🛠️'
    },
    {
      id: 3,
      title: 'Consultant Portal',
      description: 'Manage your profile, calendar, and client bookings',
      path: '/login?userType=consultant',
      color: 'warning',
      icon: '💼'
    },
    {
      id: 4,
      title: 'Admin Console',
      description: 'Configure system settings and manage platform operations',
      path: '/login?userType=admin',
      color: 'dark',
      icon: '⚙️'
    }
  ];

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <div className="bg-white border-bottom">
        <Container className="py-5">
          <Row className="text-center">
            <Col>
              <h1 className="display-4 fw-bold text-dark mb-3">
                Support & Consulting Platform
              </h1>
              <p className="lead text-muted">
                Seamless support and consulting services for your business
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Portals Grid */}
      <Container className="py-5">
        <Row className="g-4">
          {portals.map((portal) => (
            <Col key={portal.id} md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
                <Card.Body className="text-center p-4">
                  <div 
                    className={`bg-${portal.color} bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
                    style={{ width: '80px', height: '80px' }}
                  >
                    <span style={{ fontSize: '2rem' }}>{portal.icon}</span>
                  </div>
                  
                  <Card.Title className={`text-${portal.color} fw-bold`}>
                    {portal.title}
                  </Card.Title>
                  
                  <Card.Text className="text-muted small">
                    {portal.description}
                  </Card.Text>
                  
                  <Link 
                    to={portal.path}
                    className={`btn btn-${portal.color} mt-auto`}
                  >
                    Access {portal.title.split(' ')[0]} Portal
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;