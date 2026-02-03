import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" role="status" variant="primary" className="mb-3">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="text-muted">{message}</p>
    </Container>
  );
};

export default LoadingSpinner;