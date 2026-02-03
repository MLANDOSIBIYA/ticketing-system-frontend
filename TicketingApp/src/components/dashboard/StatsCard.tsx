import React from 'react';
import { Card } from 'react-bootstrap';

interface StatsCardProps {
  count: number;
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  icon?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  count, 
  label, 
  variant = 'primary',
  icon = '📊'
}) => {
  const variantColors = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger'
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="text-center">
        <div className={`display-4 fw-bold ${variantColors[variant]} mb-2`}>
          {count}
        </div>
        <div className="text-muted text-uppercase small fw-bold letter-spacing">
          {label}
        </div>
        <div className="mt-2" style={{ fontSize: '2rem' }}>
          {icon}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatsCard;