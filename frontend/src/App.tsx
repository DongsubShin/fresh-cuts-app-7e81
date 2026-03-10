import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { AdminDashboard } from './pages/admin/Dashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* User Routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/queue" element={<AdminDashboard />} /> {/* Placeholder */}
            <Route path="/admin/clients" element={<AdminDashboard />} /> {/* Placeholder */}
            <Route path="/admin/analytics" element={<AdminDashboard />} /> {/* Placeholder */}
            <Route path="/admin/commission" element={<AdminDashboard />} /> {/* Placeholder */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;