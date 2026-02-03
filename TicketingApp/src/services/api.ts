import axios from 'axios';
import type { User } from '../types';

const API_BASE_URL = 'http://localhost:5266/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const authAPI = {
  // Unified login for all user types
  login: async (credentials: { 
    email: string, 
    password: string,
    role?: 'client' | 'agent' | 'consultant' | 'admin'
  }): Promise<{ success: boolean; user: User; token: string }> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  testConnection: async () => {
    const response = await api.get('/test/health');
    return response.data;
  },
};

export const dashboardAPI = {
  getClientDashboard: async (userId: string): Promise<any> => {
    const response = await api.get(`/dashboard/client/${userId}`);
    return response.data;
  },
};

export const ticketsAPI = {
  createTicket: async (ticketData: any) => {
    const response = await api.post('/tickets', ticketData);
    return response.data;
  },
  
  getTickets: async (userId: string) => {
    const response = await api.get(`/tickets/user/${userId}`);
    return response.data;
  },
};

export default api;