import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for admin dashboard
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Client', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Agent', status: 'Active' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Consultant', status: 'Inactive' },
  ];

  const systemStats = {
    totalUsers: 156,
    activeTickets: 42,
    totalBookings: 89,
    systemUptime: '99.8%'
  };

  // Get display name from user object
  const displayName = user?.fullName || user?.email || 'Admin User';

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-2">Admin Console</h1>
              <p className="text-muted mb-0">
                Welcome, {displayName}!
              </p>
            </div>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Col>
      </Row>

      {/* System Stats */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="fs-1 mb-2">👥</div>
              <h6>Total Users</h6>
              <div className="h4 text-primary">{systemStats.totalUsers}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="fs-1 mb-2">🎫</div>
              <h6>Active Tickets</h6>
              <div className="h4 text-warning">{systemStats.activeTickets}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="fs-1 mb-2">📅</div>
              <h6>Total Bookings</h6>
              <div className="h4 text-success">{systemStats.totalBookings}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="fs-1 mb-2">⚡</div>
              <h6>System Uptime</h6>
              <div className="h4 text-info">{systemStats.systemUptime}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Management */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">User Management</h5>
                <Button variant="primary" size="sm">
                  Add New User
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge bg-${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`badge bg-${user.status === 'Active' ? 'success' : 'secondary'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-1">
                          Edit
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* System Actions */}
      <Row className="mt-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3">System Configuration</h5>
              <div className="d-grid gap-2">
                <Button variant="outline-primary">General Settings</Button>
                <Button variant="outline-success">Email Templates</Button>
                <Button variant="outline-warning">Backup & Restore</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3">Analytics & Reports</h5>
              <div className="d-grid gap-2">
                <Button variant="outline-info">System Logs</Button>
                <Button variant="outline-dark">Generate Reports</Button>
                <Button variant="outline-secondary">Audit Trail</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const getRoleColor = (role: string): string => {
  switch (role.toLowerCase()) {
    case 'client': return 'primary';
    case 'agent': return 'success';
    case 'consultant': return 'warning';
    case 'admin': return 'dark';
    default: return 'secondary';
  }
};

export default AdminDashboard;