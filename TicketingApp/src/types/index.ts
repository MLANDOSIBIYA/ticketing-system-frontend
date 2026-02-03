// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'agent' | 'consultant' | 'admin';
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Login Credentials Type
export interface LoginCredentials {
  email: string;
  password: string;
  role?: 'client' | 'agent' | 'consultant' | 'admin';
}

// Ticket Types
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  resolution?: string;
}

// Consultant Types
export interface Consultant {
  id: string;
  name: string;
  email: string;
  specialization: string;
  availability: boolean;
  rating: number;
  hourlyRate: number;
  bio: string;
}

// Booking Types
export interface Booking {
  id: string;
  clientId: string;
  consultantId: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

// Dashboard Types
export interface ClientDashboard {
  stats: {
    totalTickets: number;
    openTickets: number;
    resolvedTickets: number;
    pendingBookings: number;
  };
  recentTickets: Ticket[];
  upcomingBookings: Booking[];
  user: User;
}