import { useQuery } from '@tanstack/react-query';
import api from '../services/api/api.service';
import { DashboardStats, QueueItem } from '../types';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  queue: () => [...dashboardKeys.all, 'queue'] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: async () => {
      const { data } = await api.get<DashboardStats>('/admin/stats');
      return data;
    },
  });
}

export function useQueue() {
  return useQuery({
    queryKey: dashboardKeys.queue(),
    queryFn: async () => {
      const { data } = await api.get<QueueItem[]>('/queue/active');
      return data;
    },
  });
}