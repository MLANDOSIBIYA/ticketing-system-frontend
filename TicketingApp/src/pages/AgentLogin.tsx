import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AgentLogin: React.FC = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow">
            <Card.Body className="p-5">
              <h2 className="text-success mb-3">Agent Dashboard</h2>
              <p className="text-muted mb-4">
                Agent login functionality coming soon...
              </p>
              <div className="bg-success bg-opacity-10 rounded p-4 mb-4">
                <p className="mb-0">
                  This portal will allow agents to manage support tickets and resolve client issues.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AgentLogin;