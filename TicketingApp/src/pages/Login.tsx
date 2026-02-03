import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'Agent') {
        navigate('/agent/dashboard');
      } else if (user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/client/home');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Navigation is handled by the useEffect above
    } catch (err: any) {
      setError(err.message || 'Login failed. Please use demo credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Login</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              disabled={isLoading}
              style={{
                background: 'linear-gradient(135deg, #ffa600 0%, #ff8f00 100%)',
                border: 'none'
              }}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <p className="text-muted mb-2">
              <strong>Demo credentials:</strong>
            </p>
            <div className="small">
              <div><strong>Client:</strong> john@speccon.com / demo</div>
              <div><strong>Agent:</strong> jane@speccon.com / consultant123</div>
              <div><strong>Admin:</strong> admin@speccon.com / Admin@123</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;