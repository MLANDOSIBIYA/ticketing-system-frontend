import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import CreateTicket from './pages/CreateTicket';
import ClientHome from './pages/ClientHome';
import BookConsultant from './pages/BookConsultant';
import AgentDashboard from './pages/AgentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ConsultantDashboard from './pages/ConsultantDashboard'; // Add this page
import './index.css';
import './styles/custom.css';
import './App.css';

// Protected Route Component with role-based routing
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  allowedRoles?: string[] 
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.role?.toLowerCase();

  if (
    allowedRoles &&
    userRole &&
    !allowedRoles.map(r => r.toLowerCase()).includes(userRole)
  ) {
    // Redirect based on role
    switch (userRole) {
      case 'agent':
        return <Navigate to="/agent/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'consultant':
        return <Navigate to="/consultant/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

// Role-based dashboard redirect
const DashboardRedirect: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();

  switch (role) {
    case 'agent':
      return <Navigate to="/agent/dashboard" replace />;
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'consultant':
      return <Navigate to="/consultant/dashboard" replace />;
    default:
      return <Navigate to="/client/home" replace />;
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Client routes */}
          <Route
            path="/client/home"
            element={
              <ProtectedRoute allowedRoles={['Client']}>
                <ClientHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-ticket"
            element={
              <ProtectedRoute allowedRoles={['Client']}>
                <CreateTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-consultant"
            element={
              <ProtectedRoute allowedRoles={['Client']}>
                <BookConsultant />
              </ProtectedRoute>
            }
          />

          {/* Agent routes */}
          <Route
            path="/agent/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Agent']}>
                <AgentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Consultant routes */}
          <Route
            path="/consultant/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Consultant']}>
                <ConsultantDashboard />
              </ProtectedRoute>
            }
          />

          {/* Root path redirects based on role */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />

          {/* Legacy route redirect */}
          <Route
            path="/client/bookings/new"
            element={<Navigate to="/book-consultant" replace />}
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
