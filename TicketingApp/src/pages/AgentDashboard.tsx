import React, { useState, useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// Removed unused axios import

interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  clientName: string;
  clientEmail: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Pending Confirmation';
  createdAt: string;
  assignedTo?: string;
  category?: string;
}

const AgentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [assignedTickets, setAssignedTickets] = useState<Ticket[]>([]);
  const [availableTickets, setAvailableTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState({
    myTickets: 0,
    inProgress: 0,
    resolved: 0,
    available: 0
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Demo data function
  const loadDemoData = () => {
    const demoAssignedTickets: Ticket[] = [
      {
        id: '1',
        ticketNumber: 'TKT-001',
        subject: 'Request for additional user accounts',
        description: 'Our department is expanding and we need 5 additional user accounts for new team members.',
        clientName: 'John Doe',
        clientEmail: 'john@example.com',
        priority: 'Medium',
        status: 'In Progress',
        createdAt: '2024-01-20T10:30:00',
        assignedTo: user?.email
      },
      {
        id: '2',
        ticketNumber: 'TKT-002',
        subject: 'Password reset not sending email',
        description: 'Multiple users are not receiving password reset emails when requesting password resets.',
        clientName: 'Jane Smith',
        clientEmail: 'jane@example.com',
        priority: 'High',
        status: 'In Progress',
        createdAt: '2024-01-19T14:20:00',
        assignedTo: user?.email
      }
    ];

    const demoAvailableTickets: Ticket[] = [
      {
        id: '3',
        ticketNumber: 'TKT-003',
        subject: 'Cannot access training module',
        description: 'Loading spinner shows indefinitely when clicking on training module in the portal.',
        clientName: 'Bob Wilson',
        clientEmail: 'bob@example.com',
        priority: 'High',
        status: 'Open',
        createdAt: '2024-01-18T09:15:00'
      },
      {
        id: '4',
        ticketNumber: 'TKT-004',
        subject: 'Database connection timeout',
        description: 'Application times out when connecting to the database after recent updates.',
        clientName: 'Alice Johnson',
        clientEmail: 'alice@example.com',
        priority: 'Critical',
        status: 'Open',
        createdAt: '2024-01-17T16:45:00'
      },
      {
        id: '5',
        ticketNumber: 'TKT-005',
        subject: 'Mobile app login issue',
        description: 'Users cannot login to the mobile app on iOS devices after updating to version 2.5.',
        clientName: 'Charlie Brown',
        clientEmail: 'charlie@example.com',
        priority: 'Medium',
        status: 'Open',
        createdAt: '2024-01-16T11:20:00'
      }
    ];

    setAssignedTickets(demoAssignedTickets);
    setAvailableTickets(demoAvailableTickets);
    
    const resolvedTickets = demoAssignedTickets.filter(t => t.status === 'Resolved').length;
    const inProgressTickets = demoAssignedTickets.filter(t => t.status === 'In Progress').length;
    
    setStats({
      myTickets: demoAssignedTickets.length,
      inProgress: inProgressTickets,
      resolved: resolvedTickets,
      available: demoAvailableTickets.length
    });
  };

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      
      try {
        // For now, use demo data
        console.log('Using demo ticket data for agent dashboard');
        loadDemoData();
        setError('');
        
      } catch (err: any) {
        console.error('Error fetching tickets:', err);
        setError('Using demo data. Backend connection failed.');
        loadDemoData(); // Fallback to demo data
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [user]);

  const handleAssignTicket = async (ticketId: string) => {
    try {
      // Find the ticket to assign
      const ticketToAssign = availableTickets.find(t => t.id === ticketId);
      if (ticketToAssign) {
        const updatedTicket: Ticket = {
          ...ticketToAssign,
          assignedTo: user?.email,
          status: 'In Progress'
        };
        
        // Remove from available, add to assigned
        setAvailableTickets(prev => prev.filter(t => t.id !== ticketId));
        setAssignedTickets(prev => [...prev, updatedTicket]);
        
        // Update stats
        setStats(prev => ({
          ...prev,
          myTickets: prev.myTickets + 1,
          available: prev.available - 1,
          inProgress: prev.inProgress + 1
        }));
        
        alert(`Ticket ${ticketToAssign.ticketNumber} assigned to you successfully!`);
      }
    } catch (err) {
      console.error('Error assigning ticket:', err);
      alert('Failed to assign ticket. Please try again.');
    }
  };

  const handleMarkResolved = async (ticketId: string) => {
    try {
      // Find the ticket to mark as resolved
      const ticketIndex = assignedTickets.findIndex(t => t.id === ticketId);
      if (ticketIndex !== -1) {
        const updatedTickets = [...assignedTickets];
        updatedTickets[ticketIndex] = { 
          ...updatedTickets[ticketIndex], 
          status: 'Resolved'
        };
        
        setAssignedTickets(updatedTickets);
        
        // Update stats
        setStats(prev => ({
          ...prev,
          inProgress: prev.inProgress - 1,
          resolved: prev.resolved + 1
        }));
        
        alert(`Ticket ${updatedTickets[ticketIndex].ticketNumber} marked as resolved!`);
      }
    } catch (err) {
      console.error('Error resolving ticket:', err);
      alert('Failed to mark ticket as resolved. Please try again.');
    }
  };

  const getPriorityColor = (priority: Ticket['priority']): string => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getStatusColor = (status: Ticket['status']): string => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border border-gray-200';
      case 'Pending Confirmation': return 'bg-purple-100 text-purple-800 border border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const displayName = user?.fullName || user?.email || 'Agent';

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Loading agent dashboard...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">Agent Dashboard</h1>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                {user?.role || 'Agent'}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">Logged in as</p>
                <p className="text-sm font-semibold text-gray-800">{displayName}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {error && (
          <Alert variant="warning" className="mb-6">
            <Alert.Heading>Note</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}

        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, {displayName}!</h2>
          <p className="text-gray-600">Manage and resolve support tickets.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'My Tickets', value: stats.myTickets, color: 'bg-blue-100 text-blue-800', icon: '📋' },
            { title: 'In Progress', value: stats.inProgress, color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
            { title: 'Resolved', value: stats.resolved, color: 'bg-green-100 text-green-800', icon: '✅' },
            { title: 'Available', value: stats.available, color: 'bg-orange-100 text-orange-800', icon: '📥' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* My Assigned Tickets */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">My Assigned Tickets ({assignedTickets.length})</h3>
          </div>
          <div className="p-4">
            {assignedTickets.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No tickets assigned to you yet.
              </div>
            ) : (
              <div className="space-y-4">
                {assignedTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-bold text-gray-900">{ticket.subject}</h4>
                          <span className="text-xs font-semibold px-2 py-1 rounded-full border border-gray-300">
                            #{ticket.ticketNumber}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Client:</span> {ticket.clientName} • {ticket.clientEmail}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          Created: {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                        {ticket.status === 'In Progress' && (
                          <button 
                            onClick={() => handleMarkResolved(ticket.id)}
                            className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition-colors"
                          >
                            Mark Resolved
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Available Tickets */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Available Tickets ({availableTickets.length})</h3>
          </div>
          <div className="p-4">
            {availableTickets.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No available tickets at the moment.
              </div>
            ) : (
              <div className="space-y-4">
                {availableTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-bold text-gray-900">{ticket.subject}</h4>
                          <span className="text-xs font-semibold px-2 py-1 rounded-full border border-gray-300">
                            #{ticket.ticketNumber}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Client:</span> {ticket.clientName} • {ticket.clientEmail}
                      </div>
                      <button 
                        onClick={() => handleAssignTicket(ticket.id)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
                      >
                        Assign to Me
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Help Button */}
      <button 
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
        aria-label="Help"
        onClick={() => alert('Need help? Contact support@example.com')}
        title="Get Help"
      >
        ?
      </button>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AgentDashboard;