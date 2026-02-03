import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

interface QuickAction {
  id: number;
  title: string;
  icon: string;
  description: string;
  variant: string;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">Quick Actions</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          {actions.map((action) => (
            <Col key={action.id} md={4} className="mb-3">
              <Button
                variant={action.variant as any}
                className="w-100 h-100 py-3 d-flex flex-column align-items-center"
                onClick={action.onClick}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {action.icon}
                </div>
                <div className="fw-bold">{action.title}</div>
                <small className="opacity-75">{action.description}</small>
              </Button>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default QuickActions;