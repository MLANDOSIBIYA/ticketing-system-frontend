import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const CustomLink = ({ to, children, ...props }: any) => (
    <Link to={to} {...props}>
      {children}
    </Link>
  );

  const getUserDashboardLink = () => {
    if (!user) return '/';
    
    switch (user.role) {
      case 'client':
        return '/client/home';
      case 'agent':
        return '/agent/dashboard';
      case 'consultant':
        return '/consultant/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  const getRoleSpecificLinks = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'client':
        return (
          <>
            <Nav.Link as={CustomLink} to="/client/home">
              Client Home
            </Nav.Link>
            <Nav.Link as={CustomLink} to="/client/tickets/new">
              Create Ticket
            </Nav.Link>
            <Nav.Link as={CustomLink} to="/client/bookings/new">
              Book Consultant
            </Nav.Link>
            <Nav.Link as={CustomLink} to="/client/training">
              Training Courses
            </Nav.Link>
          </>
        );
      case 'agent':
        return (
          <>
            <Nav.Link as={CustomLink} to="/agent/dashboard">
              Agent Dashboard
            </Nav.Link>
            <Nav.Link as={CustomLink} to="/agent/tickets">
              Manage Tickets
            </Nav.Link>
          </>
        );
      case 'consultant':
        return (
          <>
            <Nav.Link as={CustomLink} to="/consultant/dashboard">
              Consultant Dashboard
            </Nav.Link>
            <Nav.Link as={CustomLink} to="/consultant/schedule">
              My Schedule
            </Nav.Link>
          </>
        );
      case 'admin':
        return (
          <>
            <Nav.Link as={CustomLink} to="/admin/dashboard">
              Admin Dashboard
            </Nav.Link>
            <Nav.Link as={CustomLink} to="/admin/users">
              Manage Users
            </Nav.Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand as={CustomLink} to={user ? getUserDashboardLink() : '/'}>
          <div className="d-flex align-items-center">
            <div className="fw-bold text-white">SpecCon Ticketing System</div>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                {getRoleSpecificLinks()}
                
                <Dropdown align="end" className="ms-3">
                  <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                    <div className="d-flex align-items-center">
                      <div className={`bg-${getRoleColor(user.role)} rounded-circle d-flex align-items-center justify-content-center me-2`} 
                           style={{ width: '32px', height: '32px' }}>
                        <span className="text-white">
                          {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="d-none d-md-inline">
                        {user.name || user.email} ({user.role})
                      </span>
                    </div>
                  </Dropdown.Toggle>
                  
                  <Dropdown.Menu>
                    <Dropdown.Item as={CustomLink} to={getUserDashboardLink()}>
                      My Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item as={CustomLink} to="/profile">
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="text-danger">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={CustomLink} to="/">Home</Nav.Link>
                <Nav.Link as={CustomLink} to="/login?userType=client">Client Portal</Nav.Link>
                <Nav.Link as={CustomLink} to="/login?userType=agent">Agent Login</Nav.Link>
                <Nav.Link as={CustomLink} to="/login?userType=consultant">Consultant Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Helper function to get role color
const getRoleColor = (role: string): string => {
  switch (role) {
    case 'client': return 'primary';
    case 'agent': return 'success';
    case 'consultant': return 'warning';
    case 'admin': return 'dark';
    default: return 'secondary';
  }
};

export default Header;