import React from 'react';
import { Table, Card, Badge, Button } from 'react-bootstrap';
import { Ticket } from '../../types';

interface TicketsTableProps {
  tickets: Ticket[];
  onViewTicket: (ticketId: string) => void;
}

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets, onViewTicket }) => {
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'critical': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'open': return 'primary';
      case 'in_progress': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'secondary';
      default: return 'secondary';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">My Open Tickets</h5>
      </Card.Header>
      <Card.Body className="p-0">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="border-0">TICKET</th>
              <th className="border-0">SUBJECT</th>
              <th className="border-0">STATUS</th>
              <th className="border-0">PRIORITY</th>
              <th className="border-0">LAST UPDATED</th>
              <th className="border-0">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="align-middle">
                  <strong>#{ticket.ticketNumber}</strong>
                </td>
                <td className="align-middle">
                  <div className="text-truncate" style={{ maxWidth: '200px' }}>
                    {ticket.subject}
                  </div>
                </td>
                <td className="align-middle">
                  <Badge bg={getStatusVariant(ticket.status)}>
                    {ticket.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </td>
                <td className="align-middle">
                  <Badge bg={getPriorityVariant(ticket.priority)}>
                    {ticket.priority.toUpperCase()}
                  </Badge>
                </td>
                <td className="align-middle">
                  <small className="text-muted">
                    {formatTimeAgo(ticket.updatedAt)}
                  </small>
                </td>
                <td className="align-middle">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onViewTicket(ticket.id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        {tickets.length === 0 && (
          <div className="text-center py-5 text-muted">
            <p>No open tickets found.</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TicketsTable;