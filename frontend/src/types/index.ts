export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'barber';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
}

export interface QueueItem {
  id: string;
  clientName: string;
  serviceName: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
  estimatedWaitTime: number;
  createdAt: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  barberId: string;
  serviceId: string;
  startTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'no-show';
}

export interface DashboardStats {
  todayRevenue: number;
  activeQueueCount: number;
  totalClients: number;
  pendingAppointments: number;
}