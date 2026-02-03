import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

const ClientLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: 'john@speccon.com',
    password: 'demo'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState<string>('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const status = await authAPI.testConnection();
        setBackendStatus(`✅ Backend connected: ${status.Status || 'Server is running'}`);
      } catch (err: any) {
        setBackendStatus(`❌ Backend not available: ${err.message}`);
      }
    };
    
    testBackendConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authAPI.clientLogin({
        email: credentials.email,
        password: credentials.password
      });
      
      if (response.success) {
        login(response.user, response.token);
        navigate('/client/home');
      } else {
        setError('Login failed: Invalid response from server');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Client Portal Login</h2>
                <p className="text-muted">
                  Enter your credentials to access your portal
                </p>
              </div>

              {backendStatus && (
                <Alert variant={backendStatus.includes('✅') ? 'success' : 'danger'} className="mb-3">
                  {backendStatus}
                </Alert>
              )}

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              <Alert variant="info" className="mb-3">
                <strong>Demo Credentials:</strong><br />
                Email: john@speccon.com<br />
                Password: demo
              </Alert>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="your.email@company.com"
                    required
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="py-2"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In to Client Portal'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <small className="text-muted">
                  Don't have an account? Contact support for access
                </small>
              </div>

              <div className="text-center mt-3">
                <Link to="/" className="text-decoration-none">
                  ← Back to Home
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientLogin;