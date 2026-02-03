import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ConsultantLogin: React.FC = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow">
            <Card.Body className="p-5">
              <h2 className="text-warning mb-3">Consultant Portal</h2>
              <p className="text-muted mb-4">
                Consultant login functionality coming soon...
              </p>
              <div className="bg-warning bg-opacity-10 rounded p-4 mb-4">
                <p className="mb-0">
                  This portal will allow consultants to manage profiles, calendars, and client bookings.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ConsultantLogin;