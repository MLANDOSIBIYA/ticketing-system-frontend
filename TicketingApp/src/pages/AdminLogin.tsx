import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AdminLogin: React.FC = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow">
            <Card.Body className="p-5">
              <h2 className="text-dark mb-3">Admin Console</h2>
              <p className="text-muted mb-4">
                Admin login functionality coming soon...
              </p>
              <div className="bg-dark bg-opacity-10 rounded p-4 mb-4">
                <p className="mb-0">
                  This portal will allow administrators to configure system settings and manage platform operations.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;